use core::array::ArrayTrait;
use core::result::ResultTrait;
use core::traits::Into;
use milestone_manager::base::errors::*;
use milestone_manager::budgetchain::MilestoneManager::*;
use milestone_manager::interfaces::IMilestoneManager::{
    IMilestoneManagerDispatcher, IMilestoneManagerDispatcherTrait,
};
use snforge_std::{
    CheatSpan, ContractClassTrait, DeclareResultTrait, EventSpyAssertionsTrait,
    cheat_caller_address, declare, spy_events,
};
use starknet::{ContractAddress, contract_address_const};


fn ADMIN() -> ContractAddress {
    contract_address_const::<'ADMIN'>()
}

fn ORGANIZATION() -> ContractAddress {
    contract_address_const::<'ORGANIZATION'>()
}

fn OTHER_ORG() -> ContractAddress {
    contract_address_const::<'OTHER_ORG'>()
}

fn NON_ORG() -> ContractAddress {
    contract_address_const::<'NON_ORG'>()
}

fn PROJECT_OWNER() -> ContractAddress {
    contract_address_const::<'PROJECT_OWNER'>()
}


fn setup_test_data() -> (u64, u256, felt252) {
    (1_u64, // project_id
    500_u256, // milestone_amount
    'Test milestone' // milestone_description
    )
}


fn deploy_milestone_manager(
    admin: ContractAddress,
) -> (ContractAddress, IMilestoneManagerDispatcher) {
    let contract_class = declare("MilestoneManager").unwrap().contract_class();

    let mut calldata: Array<felt252> = ArrayTrait::new();
    calldata.append(admin.into());

    let (contract_address, _) = contract_class.deploy(@calldata).unwrap();

    (contract_address, IMilestoneManagerDispatcher { contract_address })
}

#[test]
fn test_create_milestone() {
    let admin = ADMIN();
    let org = ORGANIZATION();

    let (contract_address, dispatcher) = deploy_milestone_manager(admin);

    // Setup test data
    let (project_id, milestone_amount, milestone_description) = setup_test_data();

    // Create milestone as admin
    cheat_caller_address(contract_address, admin, CheatSpan::TargetCalls(1));

    // Set up event spy
    let mut spy = spy_events();

    // Create milestone
    let milestone_id = dispatcher
        .create_milestone(org, project_id, milestone_description, milestone_amount);

    assert(milestone_id == 1, 'Incorrect milestone ID');

    let milestone = dispatcher.get_milestone(project_id, milestone_id);
    assert(milestone.project_id == project_id, 'Wrong project ID');
    assert(milestone.milestone_id == milestone_id, 'Wrong milestone ID');
    assert(milestone.organization == org, 'Wrong organization');
    assert(milestone.milestone_description == milestone_description, 'Wrong description');
    assert(milestone.milestone_amount == milestone_amount, 'Wrong amount');
    assert(!milestone.completed, 'Should not be completed');
    assert(!milestone.released, 'Should not be released');

    // Verify event was emitted
    spy
        .assert_emitted(
            @array![
                (
                    contract_address,
                    MilestoneManager::Event::MilestoneCreated(
                        MilestoneManager::MilestoneCreated {
                            organization: org,
                            project_id,
                            milestone_id,
                            milestone_description,
                            milestone_amount,
                            created_at: milestone.created_at,
                        },
                    ),
                ),
            ],
        );
}

#[test]
fn test_create_multiple_milestones() {
    let admin = ADMIN();
    let org = ORGANIZATION();

    let (contract_address, dispatcher) = deploy_milestone_manager(admin);

    // Setup test data
    let (project_id, milestone_amount, milestone_description) = setup_test_data();

    // Create milestones as admin
    cheat_caller_address(contract_address, admin, CheatSpan::TargetCalls(2));

    let milestone_id1 = dispatcher
        .create_milestone(org, project_id, milestone_description, milestone_amount);

    let milestone_id2 = dispatcher
        .create_milestone(org, project_id, 'Second milestone', milestone_amount * 2);

    assert(milestone_id1 == 1, 'Incorrect first milestone ID');
    assert(milestone_id2 == 2, 'Incorrect second milestone ID');

    let milestone1 = dispatcher.get_milestone(project_id, milestone_id1);
    let milestone2 = dispatcher.get_milestone(project_id, milestone_id2);

    assert(milestone1.milestone_description == milestone_description, 'Wrong description 1');
    assert(milestone1.milestone_amount == milestone_amount, 'Wrong amount 1');

    assert(milestone2.milestone_description == 'Second milestone', 'Wrong description 2');
    assert(milestone2.milestone_amount == milestone_amount * 2, 'Wrong amount 2');

    let milestones = dispatcher.get_project_milestones(project_id);
    assert(milestones.len() == 2, 'Wrong number of milestones');
}

#[test]
fn test_set_milestone_complete() {
    let admin = ADMIN();
    let org = ORGANIZATION();

    let (contract_address, dispatcher) = deploy_milestone_manager(admin);

    // Setup test data
    let (project_id, milestone_amount, milestone_description) = setup_test_data();

    // Create milestone as admin
    cheat_caller_address(contract_address, admin, CheatSpan::TargetCalls(1));
    let milestone_id = dispatcher
        .create_milestone(org, project_id, milestone_description, milestone_amount);

    // Set up event spy
    let mut spy = spy_events();

    cheat_caller_address(contract_address, admin, CheatSpan::TargetCalls(1));
    dispatcher.set_milestone_complete(project_id, milestone_id);

    let milestone = dispatcher.get_milestone(project_id, milestone_id);
    assert(milestone.completed, 'Milestone not marked complete');
    assert(!milestone.released, 'Released should still be false');

    // Verify event was emitted
    spy
        .assert_emitted(
            @array![
                (
                    contract_address,
                    MilestoneManager::Event::MilestoneCompleted(
                        MilestoneManager::MilestoneCompleted { project_id, milestone_id },
                    ),
                ),
            ],
        );
}

#[test]
#[should_panic(expected: 'Milestone already completed')]
fn test_cannot_complete_milestone_twice() {
    let admin = ADMIN();
    let org = ORGANIZATION();

    let (contract_address, dispatcher) = deploy_milestone_manager(admin);

    // Setup test data
    let (project_id, milestone_amount, milestone_description) = setup_test_data();

    cheat_caller_address(contract_address, admin, CheatSpan::TargetCalls(2));
    let milestone_id = dispatcher
        .create_milestone(org, project_id, milestone_description, milestone_amount);
    dispatcher.set_milestone_complete(project_id, milestone_id);

    cheat_caller_address(contract_address, admin, CheatSpan::TargetCalls(1));
    dispatcher.set_milestone_complete(project_id, milestone_id);
}

#[test]
#[should_panic(expected: 'Invalid milestone')]
fn test_cannot_complete_nonexistent_milestone() {
    let admin = ADMIN();
    let _org = ORGANIZATION();

    let (contract_address, dispatcher) = deploy_milestone_manager(admin);

    // Setup test data
    let (project_id, _, _) = setup_test_data();
    let nonexistent_milestone_id = 999_u64;

    cheat_caller_address(contract_address, admin, CheatSpan::TargetCalls(1));
    dispatcher.set_milestone_complete(project_id, nonexistent_milestone_id);
}

#[test]
#[should_panic(expected: 'Caller not authorized')]
fn test_unauthorized_cannot_create_milestone() {
    let admin = ADMIN();
    let org = ORGANIZATION();
    let non_org = NON_ORG();

    let (contract_address, dispatcher) = deploy_milestone_manager(admin);

    // Setup test data
    let (project_id, milestone_amount, milestone_description) = setup_test_data();

    cheat_caller_address(contract_address, non_org, CheatSpan::TargetCalls(1));
    dispatcher.create_milestone(org, project_id, milestone_description, milestone_amount);
}

#[test]
fn test_pause_and_unpause_contract() {
    let admin = ADMIN();
    let org = ORGANIZATION();

    let (contract_address, dispatcher) = deploy_milestone_manager(admin);

    assert(!dispatcher.is_paused(), 'Contract should not be paused');

    // Pause contract as admin
    cheat_caller_address(contract_address, admin, CheatSpan::TargetCalls(1));
    dispatcher.pause_contract();

    assert(dispatcher.is_paused(), 'Contract should be paused');

    cheat_caller_address(contract_address, admin, CheatSpan::TargetCalls(1));
    dispatcher.unpause_contract();

    assert(!dispatcher.is_paused(), 'Contract should be unpaused');

    // Setup test data
    let (project_id, milestone_amount, milestone_description) = setup_test_data();

    cheat_caller_address(contract_address, admin, CheatSpan::TargetCalls(1));
    let milestone_id = dispatcher
        .create_milestone(org, project_id, milestone_description, milestone_amount);

    // Verify milestone was created
    assert(milestone_id == 1, 'Milestone should be created');
}

#[test]
#[should_panic(expected: 'Contract is paused')]
fn test_cannot_create_milestone_when_paused() {
    let admin = ADMIN();
    let org = ORGANIZATION();

    let (contract_address, dispatcher) = deploy_milestone_manager(admin);

    // Setup test data
    let (project_id, milestone_amount, milestone_description) = setup_test_data();

    // Pause contract as admin
    cheat_caller_address(contract_address, admin, CheatSpan::TargetCalls(1));
    dispatcher.pause_contract();

    cheat_caller_address(contract_address, admin, CheatSpan::TargetCalls(1));
    dispatcher.create_milestone(org, project_id, milestone_description, milestone_amount);
}

#[test]
#[should_panic(expected: 'ONLY ADMIN')]
fn test_only_admin_can_pause_contract() {
    let admin = ADMIN();
    let _non_admin = NON_ORG();

    let (contract_address, dispatcher) = deploy_milestone_manager(admin);

    cheat_caller_address(contract_address, _non_admin, CheatSpan::TargetCalls(1));
    dispatcher.pause_contract();
}

#[test]
#[should_panic(expected: 'ONLY ADMIN')]
fn test_only_admin_can_unpause_contract() {
    let admin = ADMIN();
    let non_admin = NON_ORG();

    let (contract_address, dispatcher) = deploy_milestone_manager(admin);

    // Pause contract as admin
    cheat_caller_address(contract_address, admin, CheatSpan::TargetCalls(1));
    dispatcher.pause_contract();

    cheat_caller_address(contract_address, non_admin, CheatSpan::TargetCalls(1));
    dispatcher.unpause_contract();
}
