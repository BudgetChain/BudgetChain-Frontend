#[feature("deprecated_legacy_map")]
#[starknet::contract]
pub mod Budget {
     use budgetchain_contracts::base::errors::*;
    use budgetchain_contracts::base::types::{ADMIN_ROLE,ORGANIZATION_ROLE, Organization};
    use budgetchain_contracts::interfaces::IBudget::IBudget;
    use core::array::{Array, ArrayTrait};
    use core::option::Option;
    use openzeppelin::access::accesscontrol::{AccessControlComponent, DEFAULT_ADMIN_ROLE};
    use openzeppelin::introspection::src5::SRC5Component;
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess, 
        StoragePointerReadAccess, StoragePointerWriteAccess
    };
    use starknet::{
        ContractAddress, contract_address_const, get_block_timestamp, get_caller_address,
    };
    component!(path: AccessControlComponent, storage: accesscontrol, event: AccessControlEvent);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    #[abi(embed_v0)]
    impl AccessControlImpl =
        AccessControlComponent::AccessControlImpl<ContractState>;
    impl AccessControlInternalImpl = AccessControlComponent::InternalImpl<ContractState>;


    #[abi(embed_v0)]
    impl SRC5Impl = SRC5Component::SRC5Impl<ContractState>;


    #[storage]
    struct Storage {
        admin: ContractAddress,
        owner: ContractAddress,
        org_count: u256,
        organizations: Map<u256, Organization>,
        org_addresses: Map<
            ContractAddress, bool,
        >,
        org_list: Array<Organization>,
        #[substorage(v0)]
        accesscontrol: AccessControlComponent::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
    }


    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        OrganizationAdded: OrganizationAdded,
        #[flat]
        AccessControlEvent: AccessControlComponent::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        OrganizationRemoved: OrganizationRemoved,
    }

    #[derive(Drop, starknet::Event)]
    pub struct OrganizationAdded {
        pub id: u256,
        pub address: ContractAddress,
        pub name: felt252,
    }

    #[derive(Drop, starknet::Event)]
    pub struct AdminAdded {
        pub new_admin: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    pub struct OrganizationRemoved {
        pub org_id: u256,
    }


    #[constructor]
    fn constructor(ref self: ContractState, default_admin: ContractAddress) {
        assert(default_admin != contract_address_const::<0>(), ERROR_ZERO_ADDRESS);
        self.accesscontrol.initializer();
        self.accesscontrol._grant_role(DEFAULT_ADMIN_ROLE, default_admin);
        self.accesscontrol._grant_role(ADMIN_ROLE, default_admin);
        self.admin.write(default_admin);
    }

    #[abi(embed_v0)]
    impl BudgetImpl of IBudget<ContractState> {
        fn create_organization(
            ref self: ContractState, name: felt252, org_address: ContractAddress, mission: felt252,
        ) -> u256 {
            let admin = self.admin.read();
            assert(admin == get_caller_address(), ERROR_ONLY_ADMIN);

            let created_at = get_block_timestamp();
            let org_id: u256 = self.org_count.read();
            let organization = Organization {
                id: org_id,
                address: org_address,
                name,
                is_active: true,
                mission,
                created_at: created_at,
            };
            self.emit(OrganizationAdded { id: org_id, address: org_address, name: name });

            self.org_count.write(org_id + 1);
            self.organizations.write(org_id, organization);
            self.org_addresses.write(org_address, true);
            self.accesscontrol._grant_role(ORGANIZATION_ROLE, organization.address);
            self.emit(OrganizationAdded { id: org_id, address: org_address, name: name });

            org_id
        }

        fn update_organization(
            ref self: ContractState,
            name: felt252,
            org_id: u256,
            mission: felt252,
        ) {
            let admin = self.admin.read();
            assert(admin == get_caller_address(), ERROR_ONLY_ADMIN);

            let mut org = self.organizations.read(org_id);
            org.name = name;
            org.mission = mission;

            self.organizations.write(org_id, org);
        }

        fn get_organization(self: @ContractState, org_id: u256) -> Organization {
            let organization = self.organizations.read(org_id);
            organization
        }


        fn is_authorized_organization(self: @ContractState, org: ContractAddress) -> bool {
            self.org_addresses.read(org)
        }

        fn remove_organization(ref self: ContractState, org_id: u256) {
            let caller = get_caller_address();
            assert(caller == self.admin.read(), ERROR_ONLY_ADMIN);

            let mut org = self.organizations.read(org_id);
            org.is_active = false;
            self.organizations.write(org_id, org);

            self.emit(OrganizationRemoved { org_id: org_id });
        }
    }
}
