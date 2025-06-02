use budget_contract::project_manager::ProjectManager::{
    Event as ProjectManagerEvents, ProjectAllocated,
};
use budget_contract::project_manager::{
    IProjectManagerDispatcher, IProjectManagerDispatcherTrait, Project,
};
use snforge_std::{
    ContractClassTrait, DeclareResultTrait, EventSpyAssertionsTrait, declare, spy_events,
    start_cheat_caller_address_global, stop_cheat_caller_address_global,
};
use starknet::contract_address::ContractAddress;
use starknet::contract_address_const; // Import for deterministic addresses
const PROJECT_CREATOR_ROLE: felt252 = selector!("PROJECT_CREATOR_ROLE");
const DEFAULT_ADMIN_ROLE: felt252 = selector!("DEFAULT_ADMIN_ROLE");


// Helper functions for deterministic test addresses
fn owner() -> ContractAddress {
    contract_address_const::<'owner'>()
}
fn non_creator() -> ContractAddress {
    contract_address_const::<'non_creator'>()
}
fn project_owner() -> ContractAddress {
    contract_address_const::<'project_owner'>()
}
fn project_owner2() -> ContractAddress {
    contract_address_const::<'project_owner2'>()
}
fn project_owner3() -> ContractAddress {
    contract_address_const::<'project_owner3'>()
}

fn deploy(owner: ContractAddress) -> IProjectManagerDispatcher {
    let contract = declare("project_manager").unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@array![owner.into()]).unwrap();
    IProjectManagerDispatcher { contract_address }
}

#[test]
fn test_project_creation() {
    let owner = owner();
    start_cheat_caller_address_global(owner);

    let contract = deploy(owner);

    let project_owner = project_owner();
    let total_budget: u256 = 1000_u256;

    // Create project as owner (who has PROJECT_CREATOR_ROLE)
    let project_id = contract.create_project(project_owner, total_budget);

    // Fetch project and check fields
    let project: Project = contract.get_project(project_id);
    assert_eq!(project.id, project_id);
    assert_eq!(project.org, owner);
    assert_eq!(project.owner, project_owner);
    assert_eq!(project.total_budget, total_budget);
    assert_eq!(project.remaining_budget, total_budget);

    // Project count should be 1
    let count = contract.get_project_count();
    assert_eq!(count, 1_u64);
}

#[test]
fn test_budget_update_logic() {
    let owner = owner();
    start_cheat_caller_address_global(owner);

    let contract = deploy(owner);

    let project_owner = project_owner2();
    let total_budget: u256 = 500_u256;

    let project_id = contract.create_project(project_owner, total_budget);

    // Check that remaining_budget is initialized correctly
    let project: Project = contract.get_project(project_id);
    assert_eq!(project.remaining_budget, total_budget);
    // If you add a function to update budget, test it here.
// For now, just check initialization.
}

#[test]
#[should_panic(expected: 'Caller is not authorized')]
fn test_access_control_create_project_unauthorized() {
    let owner = owner();
    let non_creator = non_creator();
    let project_owner = project_owner3();
    let total_budget: u256 = 100_u256;

    start_cheat_caller_address_global(owner);
    let contract = deploy(owner);

    // Try to create a project from a non-authorized address
    stop_cheat_caller_address_global();
    start_cheat_caller_address_global(non_creator);
    contract.create_project(project_owner, total_budget);
}

#[test]
fn test_access_control_grant_and_revoke() {
    let owner = owner();
    let non_creator = non_creator();
    let project_owner = project_owner3();
    let total_budget: u256 = 100_u256;

    start_cheat_caller_address_global(owner);
    let contract = deploy(owner);

    // Grant PROJECT_CREATOR_ROLE to non_creator
    contract.authorize_organization(non_creator);

    // Now non_creator should be able to create a project
    stop_cheat_caller_address_global();
    start_cheat_caller_address_global(non_creator);
    let project_id = contract.create_project(project_owner, total_budget);
    let project: Project = contract.get_project(project_id);
    assert_eq!(project.org, non_creator);

    // Revoke role and check access is denied again
    stop_cheat_caller_address_global();
    start_cheat_caller_address_global(owner);
    contract.revoke_organization(non_creator);
}

#[test]
#[should_panic(expected: 'Caller is not authorized')]
fn test_access_control_create_project_revoked() {
    let owner = owner();
    let non_creator = non_creator();
    let project_owner = project_owner3();
    let total_budget: u256 = 100_u256;

    start_cheat_caller_address_global(owner);
    let contract = deploy(owner);
    contract.authorize_organization(non_creator);
    contract.revoke_organization(non_creator);
    stop_cheat_caller_address_global();
    start_cheat_caller_address_global(non_creator);
    contract.create_project(project_owner, total_budget);
}
#[test]
fn test_project_allocated_event() {
    let owner = owner();
    start_cheat_caller_address_global(owner);

    let contract = deploy(owner);

    let project_owner = project_owner3();
    let total_budget: u256 = 777_u256;

    let mut spy = spy_events();

    let project_id = contract.create_project(project_owner, total_budget);

    spy
        .assert_emitted(
            @array![
                (
                    contract.contract_address,
                    ProjectManagerEvents::ProjectAllocated(
                        ProjectAllocated { project_id, org: owner, project_owner, total_budget },
                    ),
                ),
            ],
        );
}
