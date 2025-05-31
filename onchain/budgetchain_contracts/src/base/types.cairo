use starknet::ContractAddress;
// organization management struct
#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct Organization {
    pub id: u256,
    pub address: ContractAddress,
    pub name: felt252,
    pub is_active: bool,
    pub mission: felt252,
    pub created_at: u64,
}

// ROLE CONSTANTS
pub const ADMIN_ROLE: felt252 = selector!("ADMIN_ROLE");
pub const ORGANIZATION_ROLE: felt252 = selector!("ORGANIZATION_ROLE");
