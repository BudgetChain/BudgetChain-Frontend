use starknet::ContractAddress;

#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct Project {
    pub id: u64,
    pub org: ContractAddress,
    pub owner: ContractAddress,
    pub total_budget: u256,
}

#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct Milestone {
    pub project_id: u64,
    pub milestone_id: u64,
    pub organization: ContractAddress,
    pub milestone_description: felt252,
    pub milestone_amount: u256,
    pub created_at: u64,
    pub completed: bool,
    pub released: bool,
}
// ROLE CONSTANTS
pub const ADMIN_ROLE: felt252 = selector!("ADMIN_ROLE");
pub const ORGANIZATION_ROLE: felt252 = selector!("ORGANIZATION_ROLE");
