use budgetchain_contracts::budgetchain::Budget;
use budgetchain_contracts::interfaces::IBudget::{IBudgetDispatcher, IBudgetDispatcherTrait};
use snforge_std::{
    CheatSpan, ContractClassTrait, DeclareResultTrait, EventSpyAssertionsTrait,
    cheat_caller_address, declare, spy_events, stop_cheat_caller_address,
};
use starknet::{ContractAddress, contract_address_const};

fn setup() -> (ContractAddress, ContractAddress) {
    let admin_address: ContractAddress = contract_address_const::<'admin'>();

    let declare_result = declare("Budget");
    assert(declare_result.is_ok(), 'Contract declaration failed');

    let contract_class = declare_result.unwrap().contract_class();
    let mut calldata = array![admin_address.into()];

    let deploy_result = contract_class.deploy(@calldata);
    assert(deploy_result.is_ok(), 'Contract deployment failed');

    let (contract_address, _) = deploy_result.unwrap();

    // ✅ Ensure we return the tuple correctly
    (contract_address, admin_address)
}


#[test]
fn test_create_organization() {
    let (contract_address, admin_address) = setup();

    let dispatcher = IBudgetDispatcher { contract_address };

    let name = 'John';
    let org_address = contract_address_const::<'Organization 1'>();
    let mission = 'Help the Poor';

    cheat_caller_address(contract_address, admin_address, CheatSpan::Indefinite);
    let org0_id = dispatcher.create_organization(name, org_address, mission);
    stop_cheat_caller_address(admin_address);
    println!("Organization id: {}", org0_id);

    assert(org0_id == 0, '1st Org ID is 0');
}
#[test]
#[should_panic(expected: 'ONLY ADMIN')]
fn test_create_organization_with_not_admin() {
    let (contract_address, _admin_address) = setup();

    let dispatcher = IBudgetDispatcher { contract_address };

    let not_admin = contract_address_const::<'not_admin'>();

    let name = 'John';
    let org_address = contract_address_const::<'Organization 1'>();
    let mission = 'Help the Poor';

    cheat_caller_address(contract_address, not_admin, CheatSpan::Indefinite);
    let org0_id = dispatcher.create_organization(name, org_address, mission);
    stop_cheat_caller_address(not_admin);
    println!("Organization id: {}", org0_id);

    assert(org0_id == 0, '1st Org ID is 0');
}

#[test]
fn test_create_organization_fields_are_populated_properly() {
    let (contract_address, admin_address) = setup();

    let dispatcher = IBudgetDispatcher { contract_address };

    let name = 'John';
    let org_address = contract_address_const::<'Organization 1'>();
    let mission = 'Help the Poor';

    cheat_caller_address(contract_address, admin_address, CheatSpan::Indefinite);
    let org0_id = dispatcher.create_organization(name, org_address, mission);
    stop_cheat_caller_address(admin_address);

    let organization = dispatcher.get_organization(org0_id);
    assert(organization.name == name, 'wrong name');
    assert(organization.address == org_address, 'wrong org_address');
    assert(organization.mission == mission, ' wrong mission');
    assert(organization.is_active, 'Not active');
}

#[test]
fn test_update_organization_fields_are_populated_properly() {
    let (contract_address, admin_address) = setup();

    let dispatcher = IBudgetDispatcher { contract_address };

    let name = 'John';
    let org_address = contract_address_const::<'Organization 1'>();
    let mission = 'Help the Poor';

    cheat_caller_address(contract_address, admin_address, CheatSpan::Indefinite);
    let org0_id = dispatcher.create_organization(name, org_address, mission);
    stop_cheat_caller_address(admin_address);

    let organization = dispatcher.get_organization(org0_id);
    assert(organization.name == name, 'wrong name');
    assert(organization.address == org_address, 'wrong org_address');
    assert(organization.mission == mission, ' wrong mission');
    assert(organization.is_active, 'Not active');

    let name = 'Chris';
    let mission = 'Robbin Hood';

    cheat_caller_address(contract_address, admin_address, CheatSpan::Indefinite);
    dispatcher.update_organization(name, org0_id, mission);
    stop_cheat_caller_address(admin_address);

    let organization = dispatcher.get_organization(org0_id);
    assert(organization.name == name, 'wrong name');
    assert(organization.address == org_address, 'wrong org_address');
    assert(organization.mission == mission, ' wrong mission');
    assert(organization.is_active, 'Not active');
}

#[test]
fn test_multiple_update_organization() {
    let (contract_address, admin_address) = setup();

    let dispatcher = IBudgetDispatcher { contract_address };

    let name = 'John';
    let org_address = contract_address_const::<'Organization 1'>();
    let mission = 'Help the Poor';

    let name1 = 'kate';
    let mission1 = 'mission feeding the needy';

    let name2 = 'michael';
    let mission2 = '100 house in africa';

    cheat_caller_address(contract_address, admin_address, CheatSpan::Indefinite);
    let org0_id = dispatcher.create_organization(name, org_address, mission);
    let org0_id1 = dispatcher.create_organization(name1, org_address, mission1);
    let org0_id2 = dispatcher.create_organization(name2, org_address, mission2);
    stop_cheat_caller_address(admin_address);

    let organization = dispatcher.get_organization(org0_id);
    // org0_id assertion
    assert(organization.name == name, 'wrong name');
    assert(organization.address == org_address, 'wrong org_address');
    assert(organization.mission == mission, ' wrong mission');
    assert(organization.is_active, 'Not active');

    // org0_id1 assertion
    let organization = dispatcher.get_organization(org0_id1);
    assert(organization.name == name1, 'wrong name');
    assert(organization.address == org_address, 'wrong org_address');
    assert(organization.mission == mission1, ' wrong mission');
    assert(organization.is_active, 'Not active');

    // org0_id2 assertion
    let organization = dispatcher.get_organization(org0_id2);
    assert(organization.name == name2, 'wrong name');
    assert(organization.address == org_address, 'wrong org_address');
    assert(organization.mission == mission2, ' wrong mission');
    assert(organization.is_active, 'Not active');

    let name = 'james';
    let mission = 'Robbin Hood';
    let name1 = 'diana';
    let mission1 = 'project ronaldo';
    let name2 = 'messi';
    let mission2 = 'project central forword';

    cheat_caller_address(contract_address, admin_address, CheatSpan::Indefinite);
    dispatcher.update_organization(name, org0_id, mission);
    dispatcher.update_organization(name1, org0_id1, mission1);
    dispatcher.update_organization(name2, org0_id2, mission2);
    stop_cheat_caller_address(admin_address);

    let organization = dispatcher.get_organization(org0_id);
    // org0_id assertion
    assert(organization.name == name, 'wrong name');
    assert(organization.address == org_address, 'wrong org_address');
    assert(organization.mission == mission, ' wrong mission');
    assert(organization.is_active, 'Not active');

    // org0_id1 assertion
    let organization = dispatcher.get_organization(org0_id1);
    assert(organization.name == name1, 'wrong name');
    assert(organization.address == org_address, 'wrong org_address');
    assert(organization.mission == mission1, ' wrong mission');
    assert(organization.is_active, 'Not active');

    // org0_id2 assertion
    let organization = dispatcher.get_organization(org0_id2);
    assert(organization.name == name2, 'wrong name');
    assert(organization.address == org_address, 'wrong org_address');
    assert(organization.mission == mission2, ' wrong mission');
    assert(organization.is_active, 'Not active');

    let name = 'elon';
    let mission = 'project 100 tesla';
    let name1 = 'tinubu';
    let mission1 = 'project nigeria';
    let name2 = 'Chris';
    let mission2 = 'Robbin Hood';

    cheat_caller_address(contract_address, admin_address, CheatSpan::Indefinite);
    dispatcher.update_organization(name, org0_id, mission);
    dispatcher.update_organization(name1, org0_id1, mission1);
    dispatcher.update_organization(name2, org0_id2, mission2);
    stop_cheat_caller_address(admin_address);

    let organization = dispatcher.get_organization(org0_id);
    // org0_id assertion
    assert(organization.name == name, 'wrong name');
    assert(organization.address == org_address, 'wrong org_address');
    assert(organization.mission == mission, ' wrong mission');
    assert(organization.is_active, 'Not active');

    // org0_id1 assertion
    let organization = dispatcher.get_organization(org0_id1);
    assert(organization.name == name1, 'wrong name');
    assert(organization.address == org_address, 'wrong org_address');
    assert(organization.mission == mission1, ' wrong mission');
    assert(organization.is_active, 'Not active');

    // org0_id2 assertion
    let organization = dispatcher.get_organization(org0_id2);
    assert(organization.name == name2, 'wrong name');
    assert(organization.address == org_address, 'wrong org_address');
    assert(organization.mission == mission2, ' wrong mission');
    assert(organization.is_active, 'Not active');
}

#[test]
fn test_create_two_organization() {
    let (contract_address, admin_address) = setup();

    let dispatcher = IBudgetDispatcher { contract_address };

    let name = 'John';
    let org_address = contract_address_const::<'Organization 1'>();
    let mission = 'Help the Poor';

    let name1 = 'Emmanuel';
    let org_address1 = contract_address_const::<'Organization 2'>();
    let mission1 = 'Build a Church';

    cheat_caller_address(contract_address, admin_address, CheatSpan::Indefinite);
    let org0_id = dispatcher.create_organization(name, org_address, mission);
    stop_cheat_caller_address(admin_address);
    println!("Organization id: {}", org0_id);

    let org1_id = dispatcher.create_organization(name1, org_address1, mission1);
    stop_cheat_caller_address(admin_address);
    println!("Organization 1 id: {}", org1_id);

    assert(org1_id == 1, '1st Org ID is 0');
    let organization1 = dispatcher.get_organization(org1_id);
    assert(organization1.name == name1, 'wrong name');
    assert(organization1.address == org_address1, 'wrong org_address');
    assert(organization1.mission == mission1, ' wrong mission');
    assert(organization1.is_active, 'Not active');
    println!("name: {}", name1);
}

#[test]
fn test_remove_organization_success() {
    let (contract_address, admin_address) = setup();
    let dispatcher = IBudgetDispatcher { contract_address };

    // Create an organization first
    let org_name = 'Test Org';
    let org_address = contract_address_const::<'Organization'>();
    let org_mission = 'Testing Budget Chain';

    // Set admin as caller to create organization
    cheat_caller_address(contract_address, admin_address, CheatSpan::Indefinite);
    let org_id = dispatcher.create_organization(org_name, org_address, org_mission);
    stop_cheat_caller_address(admin_address);

    // Verify organization is active before removal
    let org_before = dispatcher.get_organization(org_id);
    assert(org_before.is_active == true, 'be active before removal');

    // Remove organization as admin
    cheat_caller_address(contract_address, admin_address, CheatSpan::Indefinite);
    dispatcher.remove_organization(org_id);
    stop_cheat_caller_address(admin_address);

    // Verify organization is inactive after removal
    let org_after = dispatcher.get_organization(org_id);
    assert(org_after.is_active == false, 'be inactive after removal');
}

#[test]
#[should_panic(expected: 'ONLY ADMIN')]
fn test_remove_organization_not_admin() {
    let (contract_address, admin_address) = setup();
    let dispatcher = IBudgetDispatcher { contract_address };

    // Create an organization first
    let org_name = 'Test Org';
    let org_address = contract_address_const::<'Organization'>();
    let org_mission = 'Testing Budget Chain';

    // Set admin as caller to create organization
    cheat_caller_address(contract_address, admin_address, CheatSpan::Indefinite);
    let org_id = dispatcher.create_organization(org_name, org_address, org_mission);
    stop_cheat_caller_address(admin_address);

    // Try to remove organization as non-admin
    let non_admin = contract_address_const::<'non_admin'>();
    cheat_caller_address(contract_address, non_admin, CheatSpan::Indefinite);
    dispatcher.remove_organization(org_id);
    stop_cheat_caller_address(non_admin);
}

#[test]
fn test_remove_organization_event_emission() {
    let (contract_address, admin_address) = setup();
    let dispatcher = IBudgetDispatcher { contract_address };
    let mut spy = spy_events();

    // Create an organization first
    let org_name = 'Test Org';
    let org_address = contract_address_const::<'Organization'>();
    let org_mission = 'Testing Budget Chain';

    // Set admin as caller to create organization
    cheat_caller_address(contract_address, admin_address, CheatSpan::Indefinite);
    let org_id = dispatcher.create_organization(org_name, org_address, org_mission);
    stop_cheat_caller_address(admin_address);

    // Remove organization as admin
    cheat_caller_address(contract_address, admin_address, CheatSpan::Indefinite);
    dispatcher.remove_organization(org_id);
    stop_cheat_caller_address(admin_address);

    // Verify event emission
    spy
        .assert_emitted(
            @array![
                (
                    contract_address,
                    Budget::Budget::Event::OrganizationRemoved(
                        Budget::Budget::OrganizationRemoved { org_id: org_id },
                    ),
                ),
            ],
        );
}
