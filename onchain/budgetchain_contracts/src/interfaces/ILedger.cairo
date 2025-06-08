use starknet::ContractAddress;
use crate::base::types::Transaction;

#[starknet::interface]
pub trait ILedger<TContractState> {
    fn create_transaction(
        ref self: TContractState,
        project_id: u64,
        recipient: ContractAddress,
        amount: u128,
        category: felt252,
        description: felt252
    ) -> u64;
    fn get_transaction_history(
        self: @TContractState,
        project_id: Option<u64>,
        offset: u64,
        limit: u64
    ) -> Array<Transaction>;
    fn get_transaction(self: @TContractState, transaction_id: u64) -> Option<Transaction>;
    fn get_transaction_count(self: @TContractState) -> u64;
    fn get_project_transactions(
        self: @TContractState,
        project_id: u64,
        offset: u64,
        limit: u64
    ) -> Array<Transaction>;
} 