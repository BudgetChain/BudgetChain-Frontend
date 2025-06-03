use starknet::{ContractAddress, get_caller_address};

#[starknet::interface]
pub trait IProjectManager<TContractState> {
    fn authorize_organization(ref self: TContractState, org: ContractAddress);
    fn revoke_organization(ref self: TContractState, org: ContractAddress);
    fn create_project(
        ref self: TContractState, project_owner: ContractAddress, total_budget: u256,
    ) -> u64;
    fn get_project(self: @TContractState, id: u64) -> Project;
    fn get_project_count(self: @TContractState) -> u64;
    fn has_project_creator_role(self: @TContractState, org: ContractAddress) -> bool;
}

#[derive(Drop, Copy, starknet::Store, Serde)]
pub struct Project {
    pub id: u64,
    pub org: ContractAddress,
    pub owner: ContractAddress,
    pub total_budget: u256,
    pub remaining_budget: u256,
}

#[starknet::contract]
pub mod ProjectManager {
    use core::num::traits::Zero;
    use openzeppelin_access::accesscontrol::{AccessControlComponent, DEFAULT_ADMIN_ROLE};
    use openzeppelin_introspection::src5::SRC5Component;
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess,
        StoragePointerWriteAccess,
    };
    use super::{ContractAddress, IProjectManager, Project, get_caller_address};

    const PROJECT_CREATOR_ROLE: felt252 = selector!("PROJECT_CREATOR_ROLE");

    component!(path: AccessControlComponent, storage: accesscontrol, event: AccessControlEvent);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    #[abi(embed_v0)]
    impl AccessControlMixinImpl =
        AccessControlComponent::AccessControlMixinImpl<ContractState>;
    impl AccessControlInternalImpl = AccessControlComponent::InternalImpl<ContractState>;

    // Removed erroneous SRC5MixinImpl implementation as the trait or impl was not found.
    impl SRC5InternalImpl = SRC5Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        accesscontrol: AccessControlComponent::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        project_count: u64,
        projects: Map<u64, Project>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        ProjectAllocated: ProjectAllocated,
        #[flat]
        AccessControlEvent: AccessControlComponent::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
    }

    #[derive(Drop, starknet::Event)]
    pub struct ProjectAllocated {
        pub project_id: u64,
        pub org: ContractAddress,
        pub project_owner: ContractAddress,
        pub total_budget: u256,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        let caller = get_caller_address();
        self.accesscontrol._grant_role(DEFAULT_ADMIN_ROLE, caller);
        self.accesscontrol._grant_role(PROJECT_CREATOR_ROLE, caller);
        self.project_count.write(0);
    }

    #[abi(embed_v0)]
    pub impl ProjectManagerImpl of IProjectManager<ContractState> {
        fn authorize_organization(ref self: ContractState, org: ContractAddress) {
            let _caller = get_caller_address();
            self.accesscontrol.assert_only_role(DEFAULT_ADMIN_ROLE);
            self.accesscontrol.grant_role(PROJECT_CREATOR_ROLE, org);
        }

        fn revoke_organization(ref self: ContractState, org: ContractAddress) {
            let _caller = get_caller_address();
            self.accesscontrol.assert_only_role(DEFAULT_ADMIN_ROLE);
            self.accesscontrol.revoke_role(PROJECT_CREATOR_ROLE, org);
        }

        fn create_project(
            ref self: ContractState, project_owner: ContractAddress, total_budget: u256,
        ) -> u64 {
            let caller = get_caller_address();
            self.accesscontrol.assert_only_role(PROJECT_CREATOR_ROLE);
            assert(!project_owner.is_zero(), 'Owner cannot be zero');

            let current_id = self.project_count.read();
            let new_id = current_id;

            let project = Project {
                id: new_id,
                org: caller,
                owner: project_owner,
                total_budget,
                remaining_budget: total_budget,
            };

            self.projects.write(new_id, project);
            self.project_count.write(new_id + 1);

            self
                .emit(
                    Event::ProjectAllocated(
                        ProjectAllocated {
                            project_id: new_id, org: caller, project_owner, total_budget,
                        },
                    ),
                );

            new_id
        }

        fn get_project(self: @ContractState, id: u64) -> Project {
            assert(id < self.project_count.read(), 'Invalid project ID');
            self.projects.read(id)
        }

        fn get_project_count(self: @ContractState) -> u64 {
            self.project_count.read()
        }

        fn has_project_creator_role(self: @ContractState, org: ContractAddress) -> bool {
            self.accesscontrol.has_role(PROJECT_CREATOR_ROLE, org)
        }
    }
}
