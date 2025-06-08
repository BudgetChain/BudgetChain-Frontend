use budgetchain_contracts::base::types::Organization;
use starknet::ContractAddress;

#[starknet::interface]
pub trait IBudget<TContractState> {
    // Organization Management
    fn create_organization(
        ref self: TContractState, name: felt252, org_address: ContractAddress, mission: felt252,
    ) -> u256;
    fn get_organization(self: @TContractState, org_id: u256) -> Organization;
    fn is_authorized_organization(self: @TContractState, org: ContractAddress) -> bool;
    fn remove_organization(ref self: TContractState, org_id: u256);
    fn update_organization(ref self: TContractState, name: felt252, org_id: u256, mission: felt252);
}
