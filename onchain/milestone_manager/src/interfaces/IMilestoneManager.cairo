use milestone_manager::base::types::Milestone;
use starknet::ContractAddress;

#[starknet::interface]
pub trait IMilestoneManager<TContractState> {
    // Milestone Management
    fn create_milestone(
        ref self: TContractState,
        organization: ContractAddress,
        project_id: u64,
        milestone_description: felt252,
        milestone_amount: u256,
    ) -> u64;

    fn set_milestone_complete(ref self: TContractState, project_id: u64, milestone_id: u64);

    fn get_milestone(self: @TContractState, project_id: u64, milestone_id: u64) -> Milestone;

    fn get_project_milestones(self: @TContractState, project_id: u64) -> Array<Milestone>;

    // Admin functions
    fn get_admin(self: @TContractState) -> ContractAddress;
    fn is_paused(self: @TContractState) -> bool;
    fn pause_contract(ref self: TContractState);
    fn unpause_contract(ref self: TContractState);
}
