use starknet::{ContractAddress, contract_address_const};
use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address, 
    stop_cheat_caller_address, start_cheat_block_timestamp, stop_cheat_block_timestamp,
    spy_events, EventSpyAssertionsTrait
};
use core::array::ArrayTrait;

use budgetchain_contracts::base::types::{Transaction, TransactionCreated};
use budgetchain_contracts::interfaces::ILedger::{ILedgerDispatcher, ILedgerDispatcherTrait};
use budgetchain_contracts::budgetchain::Ledger;

fn deploy_ledger_contract() -> ContractAddress {
    let contract = declare("Ledger").unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@ArrayTrait::new()).unwrap();
    contract_address
}

#[test]
fn test_create_transaction() {
    let contract_address = deploy_ledger_contract();
    let dispatcher = ILedgerDispatcher { contract_address };

    let sender = contract_address_const::<'sender'>();
    let recipient = contract_address_const::<'recipient'>();
    
    start_cheat_caller_address(contract_address, sender);
    start_cheat_block_timestamp(contract_address, 1000);

    let tx_id = dispatcher.create_transaction(
        1, // project_id
        recipient,
        500, // amount
        'fund_release', // category
        'Initial project funding' // description
    );

    assert(tx_id == 1, 'Transaction ID should be 1');
    
    let transaction = dispatcher.get_transaction(tx_id).unwrap();
    assert(transaction.id == 1, 'Wrong transaction ID');
    assert(transaction.project_id == 1, 'Wrong project ID');
    assert(transaction.sender == sender, 'Wrong sender');
    assert(transaction.recipient == recipient, 'Wrong recipient');
    assert(transaction.amount == 500, 'Wrong amount');
    assert(transaction.timestamp == 1000, 'Wrong timestamp');
    assert(transaction.category == 'fund_release', 'Wrong category');
    assert(transaction.description == 'Initial project funding', 'Wrong description');

    stop_cheat_caller_address(contract_address);
    stop_cheat_block_timestamp(contract_address);
}

#[test]
fn test_transaction_event_emission() {
    let contract_address = deploy_ledger_contract();
    let dispatcher = ILedgerDispatcher { contract_address };

    let sender = contract_address_const::<'sender'>();
    let recipient = contract_address_const::<'recipient'>();
    
    start_cheat_caller_address(contract_address, sender);
    start_cheat_block_timestamp(contract_address, 1500);

    let mut spy = spy_events();

    let tx_id = dispatcher.create_transaction(
        2, // project_id
        recipient,
        750, // amount
        'payment', // category
        'Service payment' // description
    );

    // Check that the TransactionCreated event was emitted
    spy.assert_emitted(@array![
        (
            contract_address,
            Ledger::Ledger::Event::TransactionCreated(
                TransactionCreated {
                    id: tx_id.into(),
                    project_id: 2,
                    sender: sender,
                    recipient: recipient,
                    amount: 750,
                    timestamp: 1500,
                    category: 'payment',
                    description: 'Service payment',
                }
            )
        )
    ]);

    stop_cheat_caller_address(contract_address);
    stop_cheat_block_timestamp(contract_address);
}

#[test]
fn test_multiple_transactions() {
    let contract_address = deploy_ledger_contract();
    let dispatcher = ILedgerDispatcher { contract_address };

    let sender = contract_address_const::<'sender'>();
    let recipient1 = contract_address_const::<'recipient1'>();
    let recipient2 = contract_address_const::<'recipient2'>();
    
    start_cheat_caller_address(contract_address, sender);
    start_cheat_block_timestamp(contract_address, 1000);

    // Create first transaction
    let tx_id1 = dispatcher.create_transaction(
        1, recipient1, 500, 'fund_release', 'First funding'
    );
    
    // Create second transaction
    let tx_id2 = dispatcher.create_transaction(
        1, recipient2, 300, 'payment', 'Service payment'
    );
    
    // Create third transaction for different project
    let tx_id3 = dispatcher.create_transaction(
        2, recipient1, 200, 'fund_release', 'Second project funding'
    );

    assert(tx_id1 == 1, 'First txn ID should be 1');
    assert(tx_id2 == 2, 'Second txn ID should be 2');
    assert(tx_id3 == 3, 'Third txn ID should be 3');
    
    let count = dispatcher.get_transaction_count();
    assert(count == 3, 'Total txn count should be 3');

    stop_cheat_caller_address(contract_address);
    stop_cheat_block_timestamp(contract_address);
}

#[test]
fn test_get_transaction_history_pagination() {
    let contract_address = deploy_ledger_contract();
    let dispatcher = ILedgerDispatcher { contract_address };

    let sender = contract_address_const::<'sender'>();
    let recipient = contract_address_const::<'recipient'>();
    
    start_cheat_caller_address(contract_address, sender);
    start_cheat_block_timestamp(contract_address, 1000);

    // Create 5 transactions
    let mut i: u64 = 0;
    while i < 5 {
        dispatcher.create_transaction(
            1, recipient, 100 + i.try_into().unwrap(), 'test', 'Test transaction'
        );
        i += 1;
    };

    // Test pagination - get first 2 transactions
    let page1 = dispatcher.get_transaction_history(Option::None, 0, 2);
    assert(page1.len() == 2, 'Page 1 should have 2 txn');
    
    // Test pagination - get next 2 transactions
    let page2 = dispatcher.get_transaction_history(Option::None, 2, 2);
    assert(page2.len() == 2, 'Page 2 should have 2 txn');
    
    // Test pagination - get last transaction
    let page3 = dispatcher.get_transaction_history(Option::None, 4, 2);
    assert(page3.len() == 1, 'Page 3 should have 1 txn');

    stop_cheat_caller_address(contract_address);
    stop_cheat_block_timestamp(contract_address);
}

#[test]
fn test_get_project_transactions() {
    let contract_address = deploy_ledger_contract();
    let dispatcher = ILedgerDispatcher { contract_address };

    let sender = contract_address_const::<'sender'>();
    let recipient = contract_address_const::<'recipient'>();
    
    start_cheat_caller_address(contract_address, sender);
    start_cheat_block_timestamp(contract_address, 1000);

    // Create transactions for different projects
    dispatcher.create_transaction(1, recipient, 100, 'fund', 'Project 1 - Tx 1');
    dispatcher.create_transaction(2, recipient, 200, 'fund', 'Project 2 - Tx 1');
    dispatcher.create_transaction(1, recipient, 150, 'payment', 'Project 1 - Tx 2');
    dispatcher.create_transaction(2, recipient, 250, 'payment', 'Project 2 - Tx 2');
    dispatcher.create_transaction(1, recipient, 175, 'refund', 'Project 1 - Tx 3');

    // Get transactions for project 1
    let project1_txs = dispatcher.get_project_transactions(1, 0, 10);
    assert(project1_txs.len() == 3, 'Project 1 should have 3 txn');
    
    // Get transactions for project 2
    let project2_txs = dispatcher.get_project_transactions(2, 0, 10);
    assert(project2_txs.len() == 2, 'Project 2 should have 2 txn');
    
    // Test pagination for project transactions
    let project1_page1 = dispatcher.get_project_transactions(1, 0, 2);
    assert(project1_page1.len() == 2, 'Proj 1 page 1 should have 2 txn');
    
    let project1_page2 = dispatcher.get_project_transactions(1, 2, 2);
    assert(project1_page2.len() == 1, 'Proj 1 page 2 should have 1 txn');

    stop_cheat_caller_address(contract_address);
    stop_cheat_block_timestamp(contract_address);
}

#[test]
fn test_get_nonexistent_transaction() {
    let contract_address = deploy_ledger_contract();
    let dispatcher = ILedgerDispatcher { contract_address };

    // Try to get a non-existent transaction
    let result = dispatcher.get_transaction(999);
    assert(result.is_none(), 'Should return None for 0 txn');
    
    // Try to get transaction with ID 0
    let result_zero = dispatcher.get_transaction(0);
    assert(result_zero.is_none(), 'Should return None for txn ID 0');
}

#[test]
#[should_panic(expected: ('Amount must be greater than 0',))]
fn test_create_transaction_zero_amount() {
    let contract_address = deploy_ledger_contract();
    let dispatcher = ILedgerDispatcher { contract_address };

    let sender = contract_address_const::<'sender'>();
    let recipient = contract_address_const::<'recipient'>();
    
    start_cheat_caller_address(contract_address, sender);

    // This should panic
    dispatcher.create_transaction(
        1, recipient, 0, 'fund', 'Zero amount transaction'
    );

    stop_cheat_caller_address(contract_address);
}

#[test]
#[should_panic(expected: ('Recipient cannot be zero addr',))]
fn test_create_transaction_zero_recipient() {
    let contract_address = deploy_ledger_contract();
    let dispatcher = ILedgerDispatcher { contract_address };

    let sender = contract_address_const::<'sender'>();
    let zero_address = contract_address_const::<0>();
    
    start_cheat_caller_address(contract_address, sender);

    // This should panic
    dispatcher.create_transaction(
        1, zero_address, 100, 'fund', 'Zero recipient transaction'
    );

    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_transaction_count_increments() {
    let contract_address = deploy_ledger_contract();
    let dispatcher = ILedgerDispatcher { contract_address };

    let sender = contract_address_const::<'sender'>();
    let recipient = contract_address_const::<'recipient'>();
    
    start_cheat_caller_address(contract_address, sender);

    assert(dispatcher.get_transaction_count() == 0, 'Initial count should be 0');
    
    dispatcher.create_transaction(1, recipient, 100, 'fund', 'Transaction 1');
    assert(dispatcher.get_transaction_count() == 1, 'Cnt should be 1 after first txn');
    
    dispatcher.create_transaction(1, recipient, 200, 'fund', 'Transaction 2');
    assert(dispatcher.get_transaction_count() == 2, 'Count should be 2 after sec txn');

    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_empty_transaction_history() {
    let contract_address = deploy_ledger_contract();
    let dispatcher = ILedgerDispatcher { contract_address };

    // Get history when no transactions exist
    let history = dispatcher.get_transaction_history(Option::None, 0, 10);
    assert(history.len() == 0, 'History should be empty');
    
    // Get project transactions when no transactions exist
    let project_history = dispatcher.get_project_transactions(1, 0, 10);
    assert(project_history.len() == 0, 'Project history should be empty');
} 