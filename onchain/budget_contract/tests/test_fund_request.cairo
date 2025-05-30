use starknet::ContractAddress;
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address, stop_cheat_caller_address};
use fund_request_contract::{
    IFundRequestDispatcher, IFundRequestDispatcherTrait
};


#[starknet::interface]
trait IProjectContract<TContractState> {
    fn is_milestone_completed(self: @TContractState, project_id: u64, milestone_id: u64) -> bool;
    fn get_project_owner(self: @TContractState, project_id: u64) -> ContractAddress;
    fn update_project_budget(ref self: TContractState, project_id: u64, amount: u128);
}

#[starknet::contract]
mod MockProjectContract {
    use super::IProjectContract;
    use starknet::ContractAddress;
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};

    #[storage]
    struct Storage {
        completed_milestones: Map<(u64, u64), bool>,
        project_owners: Map<u64, ContractAddress>,
        project_budgets: Map<u64, u128>,
    }

    #[abi(embed_v0)]
    impl MockProjectContractImpl of IProjectContract<ContractState> {
        fn is_milestone_completed(self: @ContractState, project_id: u64, milestone_id: u64) -> bool {
            self.completed_milestones.read((project_id, milestone_id))
        }

        fn get_project_owner(self: @ContractState, project_id: u64) -> ContractAddress {
            self.project_owners.read(project_id)
        }

        fn update_project_budget(ref self: ContractState, project_id: u64, amount: u128) {
            let current_budget = self.project_budgets.read(project_id);
            self.project_budgets.write(project_id, current_budget + amount);
        }
    }

    #[generate_trait]
    impl TestHelpersImpl of TestHelpersTrait {
        fn set_milestone_completed(ref self: ContractState, project_id: u64, milestone_id: u64, completed: bool) {
            self.completed_milestones.write((project_id, milestone_id), completed);
        }

        fn set_project_owner(ref self: ContractState, project_id: u64, owner: ContractAddress) {
            self.project_owners.write(project_id, owner);
        }

        fn get_project_budget(self: @ContractState, project_id: u64) -> u128 {
            self.project_budgets.read(project_id)
        }
    }
}


fn get_contract_address(address: felt252) -> ContractAddress {
    address.try_into().unwrap()
}


fn get_zero_address() -> ContractAddress {
    0_felt252.try_into().unwrap()
}

fn deploy_mock_project_contract() -> ContractAddress {
    let contract = declare("MockProjectContract").unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@ArrayTrait::new()).unwrap();
    contract_address
}

fn deploy_fund_request_contract(
    owner: ContractAddress,
    project_contract: ContractAddress
) -> IFundRequestDispatcher {
    let mut calldata = ArrayTrait::new();
    calldata.append(owner.into());
    calldata.append(project_contract.into());

    let contract = declare("FundRequest").unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@calldata).unwrap();

    IFundRequestDispatcher { contract_address }
}


fn setup() -> (IFundRequestDispatcher, ContractAddress, ContractAddress, ContractAddress, ContractAddress) {
    let owner = get_contract_address('owner');
    let project_owner = get_contract_address('project_owner');
    let approver = get_contract_address('approver');
    
    let project_contract_address = deploy_mock_project_contract();
    let fund_request = deploy_fund_request_contract(owner, project_contract_address);

    (fund_request, owner, project_owner, approver, project_contract_address)
}

#[test]
fn test_constructor() {
    let (fund_request, owner, _project_owner, _approver, _project_contract_address) = setup();
    
    assert(fund_request.get_request_count() == 0, 'Initial count should be 0');
    assert(fund_request.is_authorized_approver(owner), 'Owner should be authorized');
}

#[test]
#[should_panic(expected: ('Result::unwrap failed.',))]
fn test_constructor_zero_owner() {
    let project_contract = deploy_mock_project_contract();
    let _fund_request = deploy_fund_request_contract(get_zero_address(), project_contract);
}

#[test]
#[should_panic(expected: ('Result::unwrap failed.',))]
fn test_constructor_zero_project_contract() {
    let owner = get_contract_address('owner');
    let _fund_request = deploy_fund_request_contract(owner, get_zero_address());
}

#[test]
fn test_basic_functionality() {
    let (fund_request, owner, _project_owner, _approver, _project_contract_address) = setup();
    let count = fund_request.get_request_count();
    let is_authorized = fund_request.is_authorized_approver(owner);
    
    assert(count == 0, 'Count should be 0');
    assert(is_authorized, 'Owner should be authorized');
}

#[test]
#[should_panic(expected: ('Invalid amount',))]
fn test_create_fund_request_zero_amount() {
    let (fund_request, _owner, project_owner, _approver, _project_contract_address) = setup();
    
    start_cheat_caller_address(fund_request.contract_address, project_owner);
    fund_request.create_fund_request(1, 1, 0);
    stop_cheat_caller_address(fund_request.contract_address);
}

#[test]
fn test_get_request_count() {
    let (fund_request, _owner, _project_owner, _approver, _project_contract_address) = setup();
    
    let count = fund_request.get_request_count();
    assert(count == 0, 'Initial count should be 0');
}

#[test]
fn test_is_authorized_approver() {
    let (fund_request, owner, _project_owner, approver, _project_contract_address) = setup();
    
    assert(fund_request.is_authorized_approver(owner), 'Owner should be authorized');
    
    
    assert(!fund_request.is_authorized_approver(approver), 'Should not be authorized');
}

#[test]
#[should_panic(expected: ('Request not found',))]
fn test_get_nonexistent_request() {
    let (fund_request, _owner, _project_owner, _approver, _project_contract_address) = setup();
    
    fund_request.get_fund_request(999); // Non-existent request
}

#[test]
#[should_panic(expected: ('Unauthorized access',))]
fn test_approve_fund_request_unauthorized() {
    let (fund_request, _owner, _project_owner, _approver, _project_contract_address) = setup();
    
    let unauthorized = get_contract_address('unauthorized');
    start_cheat_caller_address(fund_request.contract_address, unauthorized);
    fund_request.approve_fund_request(1);
    stop_cheat_caller_address(fund_request.contract_address);
}

#[test]
#[should_panic(expected: ('Unauthorized access',))]
fn test_reject_fund_request_unauthorized() {
    let (fund_request, _owner, _project_owner, _approver, _project_contract_address) = setup();
    
    let unauthorized = get_contract_address('unauthorized');
    start_cheat_caller_address(fund_request.contract_address, unauthorized);
    fund_request.reject_fund_request(1);
    stop_cheat_caller_address(fund_request.contract_address);
}

#[test]
fn test_contract_deployment() {
    let owner = get_contract_address('owner');
    let project_contract = deploy_mock_project_contract();
    let fund_request = deploy_fund_request_contract(owner, project_contract);
    
    assert(fund_request.contract_address != get_zero_address(), 'Contract should be deployed');
}

#[test]
fn test_owner_functions() {
    let (fund_request, owner, _project_owner, _approver, _project_contract_address) = setup();
    
    
    let contract_owner = fund_request.get_owner();
    assert(contract_owner == owner, 'Owner should match');
    
    
    let project_contract = fund_request.get_project_contract();
    assert(project_contract == _project_contract_address, 'Project contract match');
}

#[test]
fn test_add_authorized_approver() {
    let (fund_request, owner, _project_owner, approver, _project_contract_address) = setup();
    
    
    assert(!fund_request.is_authorized_approver(approver), 'Should not be authorized');
    
    
    start_cheat_caller_address(fund_request.contract_address, owner);
    fund_request.add_authorized_approver(approver);
    stop_cheat_caller_address(fund_request.contract_address);
    
    
    assert(fund_request.is_authorized_approver(approver), 'Should be authorized');
}

#[test]
#[should_panic(expected: ('Unauthorized access',))]
fn test_add_authorized_approver_unauthorized() {
    let (fund_request, _owner, _project_owner, approver, _project_contract_address) = setup();
    
    let unauthorized = get_contract_address('unauthorized');
    start_cheat_caller_address(fund_request.contract_address, unauthorized);
    fund_request.add_authorized_approver(approver);
    stop_cheat_caller_address(fund_request.contract_address);
}