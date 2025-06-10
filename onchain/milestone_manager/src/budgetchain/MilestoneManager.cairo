#[starknet::contract]
#[feature("deprecated-starknet-consts")]
pub mod MilestoneManager {
    use core::array::{Array, ArrayTrait};
    use milestone_manager::base::errors::*;
    use milestone_manager::base::types::{ADMIN_ROLE, Milestone, ORGANIZATION_ROLE, Project};
    use milestone_manager::interfaces::IMilestoneManager::IMilestoneManager;
    use openzeppelin::access::accesscontrol::{AccessControlComponent, DEFAULT_ADMIN_ROLE};
    use openzeppelin::introspection::src5::SRC5Component;
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess,
        StoragePointerWriteAccess,
    };
    use starknet::{
        ContractAddress, contract_address_const, get_block_timestamp, get_caller_address,
    };
    component!(path: AccessControlComponent, storage: accesscontrol, event: AccessControlEvent);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    // AccessControl Mixin
    #[abi(embed_v0)]
    impl AccessControlImpl =
        AccessControlComponent::AccessControlImpl<ContractState>;
    impl AccessControlInternalImpl = AccessControlComponent::InternalImpl<ContractState>;

    // SRC5 Mixin
    #[abi(embed_v0)]
    impl SRC5Impl = SRC5Component::SRC5Impl<ContractState>;

    #[storage]
    struct Storage {
        admin: ContractAddress,
        projects: Map<u64, Project>,
        milestones: Map<(u64, u64), Milestone>, // (project_id, milestone_id) -> Milestone
        project_milestone_count: Map<u64, u64>, // project_id -> count of milestones
        is_paused: bool,
        #[substorage(v0)]
        accesscontrol: AccessControlComponent::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        MilestoneCreated: MilestoneCreated,
        MilestoneCompleted: MilestoneCompleted,
        #[flat]
        AccessControlEvent: AccessControlComponent::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
    }

    #[derive(Drop, starknet::Event)]
    pub struct MilestoneCreated {
        pub organization: ContractAddress,
        pub project_id: u64,
        pub milestone_id: u64,
        pub milestone_description: felt252,
        pub milestone_amount: u256,
        pub created_at: u64,
    }

    #[derive(Drop, starknet::Event)]
    pub struct MilestoneCompleted {
        pub project_id: u64,
        pub milestone_id: u64,
    }

    #[constructor]
    fn constructor(ref self: ContractState, default_admin: ContractAddress) {
        assert(default_admin != contract_address_const::<0>(), ERROR_ZERO_ADDRESS);

        // Initialize access control
        self.accesscontrol.initializer();
        self.accesscontrol._grant_role(DEFAULT_ADMIN_ROLE, default_admin);
        self.accesscontrol._grant_role(ADMIN_ROLE, default_admin);

        // Initialize contract storage
        self.admin.write(default_admin);
        self.is_paused.write(false);
    }

    #[abi(embed_v0)]
    impl MilestoneManagerImpl of IMilestoneManager<ContractState> {
        fn create_milestone(
            ref self: ContractState,
            organization: ContractAddress,
            project_id: u64,
            milestone_description: felt252,
            milestone_amount: u256,
        ) -> u64 {
            // Ensure the contract is not paused
            self.assert_not_paused();

            // Verify caller's authorization
            let caller = get_caller_address();
            let admin = self.admin.read();

            assert(
                caller == admin
                    || self.accesscontrol.has_role(ORGANIZATION_ROLE, caller)
                    || caller == organization,
                ERROR_UNAUTHORIZED,
            );

            // Verify project exists with a valid ID
            assert(project_id > 0, ERROR_INVALID_PROJECT_ID);

            // Generate new milestone ID
            let milestone_id = self.project_milestone_count.read(project_id) + 1;

            // Create new milestone
            let created_at = get_block_timestamp();
            let new_milestone = Milestone {
                project_id,
                milestone_id,
                organization,
                milestone_description,
                milestone_amount,
                created_at,
                completed: false,
                released: false,
            };
            self.milestones.write((project_id, milestone_id), new_milestone);
            self.project_milestone_count.write(project_id, milestone_id);
            self
                .emit(
                    Event::MilestoneCreated(
                        MilestoneCreated {
                            organization,
                            project_id,
                            milestone_id,
                            milestone_description,
                            milestone_amount,
                            created_at,
                        },
                    ),
                );
            milestone_id
        }

        fn set_milestone_complete(ref self: ContractState, project_id: u64, milestone_id: u64) {
            // Ensure the contract is not paused
            self.assert_not_paused();
            let mut milestone = self.milestones.read((project_id, milestone_id));
            assert(milestone.project_id == project_id, ERROR_INVALID_MILESTONE);
            assert(milestone.milestone_id == milestone_id, ERROR_INVALID_MILESTONE);
            assert(!milestone.completed, ERROR_MILESTONE_ALREADY_COMPLETED);
            milestone.completed = true;
            self.milestones.write((project_id, milestone_id), milestone);
            self.emit(Event::MilestoneCompleted(MilestoneCompleted { project_id, milestone_id }));
        }

        fn get_milestone(self: @ContractState, project_id: u64, milestone_id: u64) -> Milestone {
            self.milestones.read((project_id, milestone_id))
        }

        fn get_project_milestones(self: @ContractState, project_id: u64) -> Array<Milestone> {
            let mut milestones = ArrayTrait::new();
            let milestone_count = self.project_milestone_count.read(project_id);
            let mut i: u64 = 1;
            while i != milestone_count + 1 {
                milestones.append(self.milestones.read((project_id, i)));
                i += 1;
            }
            milestones
        }

        fn get_admin(self: @ContractState) -> ContractAddress {
            self.admin.read()
        }

        fn is_paused(self: @ContractState) -> bool {
            self.is_paused.read()
        }

        fn pause_contract(ref self: ContractState) {
            let caller = get_caller_address();
            assert(caller == self.admin.read(), ERROR_ONLY_ADMIN);
            assert(!self.is_paused.read(), ERROR_ALREADY_PAUSED);
            self.is_paused.write(true);
        }

        fn unpause_contract(ref self: ContractState) {
            let caller = get_caller_address();
            assert(caller == self.admin.read(), ERROR_ONLY_ADMIN);
            self.is_paused.write(false);
        }
    }

    #[generate_trait]
    pub impl Internal of InternalTrait {
        // Internal view function
        // - Takes `@self` as it only needs to read state
        // - Can only be called by other functions within the contract
        fn assert_not_paused(self: @ContractState) {
            assert(!self.is_paused.read(), ERROR_CONTRACT_PAUSED);
        }
    }
}
