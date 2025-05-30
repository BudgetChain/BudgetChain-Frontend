use starknet::ContractAddress;

#[starknet::interface]
pub trait IFundRequest<TContractState> {
    fn create_fund_request(
        ref self: TContractState,
        project_id: u64,
        milestone_id: u64,
        amount: u128
    ) -> u64;
    
    fn approve_fund_request(ref self: TContractState, request_id: u64);
    fn reject_fund_request(ref self: TContractState, request_id: u64);
    fn get_fund_request(self: @TContractState, request_id: u64) -> FundRequestStruct;
    fn get_request_count(self: @TContractState) -> u64;
    fn is_authorized_approver(self: @TContractState, address: ContractAddress) -> bool;
    fn add_authorized_approver(ref self: TContractState, approver: ContractAddress);
    fn remove_authorized_approver(ref self: TContractState, approver: ContractAddress);
    fn get_owner(self: @TContractState) -> ContractAddress;
    fn get_project_contract(self: @TContractState) -> ContractAddress;
}

#[starknet::interface]
pub trait IProjectContract<TContractState> {
    fn is_milestone_completed(self: @TContractState, project_id: u64, milestone_id: u64) -> bool;
    fn get_project_owner(self: @TContractState, project_id: u64) -> ContractAddress;
    fn update_project_budget(ref self: TContractState, project_id: u64, amount: u128);
}

#[derive(Drop, starknet::Event)]
pub struct FundsRequested {
    pub project_id: u64,
    pub request_id: u64,
    pub milestone_id: u64,
}

#[derive(Drop, starknet::Event)]
pub struct FundsReleased {
    pub project_id: u64,
    pub request_id: u64,
    pub milestone_id: u64,
    pub amount: u128,
}

#[derive(Drop, starknet::Event)]
pub struct FundsReturned {
    pub project_id: u64,
    pub amount: u128,
    pub project_owner: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct AuthorizedApproverAdded {
    pub approver: ContractAddress,
}

#[derive(Drop, starknet::Event)]
pub struct AuthorizedApproverRemoved {
    pub approver: ContractAddress,
}

#[derive(Drop, Serde, starknet::Store, Copy)]
#[allow(starknet::store_no_default_variant)]
pub enum FundRequestStatus {
    Pending,
    Approved,
    Rejected,
}

#[derive(Drop, Serde, starknet::Store, Copy)]
pub struct FundRequestStruct {
    pub project_id: u64,
    pub milestone_id: u64,
    pub amount: u128,
    pub requester: ContractAddress,
    pub status: FundRequestStatus,
}

#[starknet::contract]
pub mod FundRequest {
    use super::{
        IFundRequest, IProjectContractDispatcher, IProjectContractDispatcherTrait,
        FundsRequested, FundsReleased, FundsReturned, AuthorizedApproverAdded, AuthorizedApproverRemoved,
        FundRequestStatus, FundRequestStruct
    };
    use starknet::{ContractAddress, get_caller_address};
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess, StoragePointerWriteAccess};
    use core::num::traits::Zero;

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        FundsRequested: FundsRequested,
        FundsReleased: FundsReleased,
        FundsReturned: FundsReturned,
        AuthorizedApproverAdded: AuthorizedApproverAdded,
        AuthorizedApproverRemoved: AuthorizedApproverRemoved,
    }

    #[storage]
    struct Storage {
        fund_requests: Map<u64, FundRequestStruct>,
        request_counter: u64,
        owner: ContractAddress,
        project_contract: ContractAddress,
        authorized_approvers: Map<ContractAddress, bool>,
        request_exists: Map<u64, bool>,  // Track which requests exist
    }

    pub mod Errors {
        pub const UNAUTHORIZED: felt252 = 'Unauthorized access';
        pub const MILESTONE_NOT_COMPLETED: felt252 = 'Milestone not completed';
        pub const INVALID_AMOUNT: felt252 = 'Invalid amount';
        pub const REQUEST_NOT_FOUND: felt252 = 'Request not found';
        pub const REQUEST_NOT_PENDING: felt252 = 'Request not pending';
        pub const NOT_PROJECT_OWNER: felt252 = 'Not project owner';
        pub const ZERO_ADDRESS: felt252 = 'Zero address not allowed';
        pub const ALREADY_AUTHORIZED: felt252 = 'Already authorized';
        pub const NOT_AUTHORIZED: felt252 = 'Not authorized approver';
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        owner: ContractAddress,
        project_contract: ContractAddress
    ) {
        assert(!owner.is_zero(), Errors::ZERO_ADDRESS);
        assert(!project_contract.is_zero(), Errors::ZERO_ADDRESS);
        
        self.owner.write(owner);
        self.project_contract.write(project_contract);
        self.request_counter.write(0);
        
        // Owner is automatically an authorized approver
        self.authorized_approvers.write(owner, true);
    }

    #[abi(embed_v0)]
    impl FundRequestImpl of IFundRequest<ContractState> {
        fn create_fund_request(
            ref self: ContractState,
            project_id: u64,
            milestone_id: u64,
            amount: u128
        ) -> u64 {
            let caller = get_caller_address();
            
            // Validate input
            assert(amount > 0, Errors::INVALID_AMOUNT);
            
            // Get project contract dispatcher
            let project_dispatcher = IProjectContractDispatcher {
                contract_address: self.project_contract.read()
            };
            
            // Verify caller is the project owner
            let project_owner = project_dispatcher.get_project_owner(project_id);
            assert(caller == project_owner, Errors::NOT_PROJECT_OWNER);
            
            // Verify milestone is completed
            assert(
                project_dispatcher.is_milestone_completed(project_id, milestone_id),
                Errors::MILESTONE_NOT_COMPLETED
            );
            
            // Create new request
            let request_id = self.request_counter.read() + 1;
            self.request_counter.write(request_id);
            
            let fund_request = FundRequestStruct {
                project_id,
                milestone_id,
                amount,
                requester: caller,
                status: FundRequestStatus::Pending,
            };
            
            self.fund_requests.write(request_id, fund_request);
            self.request_exists.write(request_id, true);  // Mark as existing
            
            
            self.emit(FundsRequested { project_id, request_id, milestone_id });
            
            request_id
        }

        fn approve_fund_request(ref self: ContractState, request_id: u64) {
            let caller = get_caller_address();
            
            
            assert(self.authorized_approvers.read(caller), Errors::UNAUTHORIZED);
            
            
            assert(self.request_exists.read(request_id), Errors::REQUEST_NOT_FOUND);
            
            
            let request = self.fund_requests.read(request_id);
            
            match request.status {
                FundRequestStatus::Pending => {},
                _ => core::panic_with_felt252(Errors::REQUEST_NOT_PENDING)
            }
            
            
            let updated_request = FundRequestStruct {
                project_id: request.project_id,
                milestone_id: request.milestone_id,
                amount: request.amount,
                requester: request.requester,
                status: FundRequestStatus::Approved,
            };
            
            
            self.fund_requests.write(request_id, updated_request);
            
            
            let project_dispatcher = IProjectContractDispatcher {
                contract_address: self.project_contract.read()
            };
            project_dispatcher.update_project_budget(request.project_id, request.amount);
            
            
            self.emit(FundsReleased {
                project_id: request.project_id,
                request_id,
                milestone_id: request.milestone_id,
                amount: request.amount,
            });
        }

        fn reject_fund_request(ref self: ContractState, request_id: u64) {
            let caller = get_caller_address();
            
        
            assert(self.authorized_approvers.read(caller), Errors::UNAUTHORIZED);
            
            
            assert(self.request_exists.read(request_id), Errors::REQUEST_NOT_FOUND);
            
            
            let request = self.fund_requests.read(request_id);
            
            match request.status {
                FundRequestStatus::Pending => {},
                _ => core::panic_with_felt252(Errors::REQUEST_NOT_PENDING)
            }
            
            
            let updated_request = FundRequestStruct {
                project_id: request.project_id,
                milestone_id: request.milestone_id,
                amount: request.amount,
                requester: request.requester,
                status: FundRequestStatus::Rejected,
            };
            
            self.fund_requests.write(request_id, updated_request);
        }

        fn get_fund_request(self: @ContractState, request_id: u64) -> FundRequestStruct {
            
            assert(self.request_exists.read(request_id), Errors::REQUEST_NOT_FOUND);
            self.fund_requests.read(request_id)
        }

        fn get_request_count(self: @ContractState) -> u64 {
            self.request_counter.read()
        }

        fn is_authorized_approver(self: @ContractState, address: ContractAddress) -> bool {
            self.authorized_approvers.read(address)
        }

        fn add_authorized_approver(ref self: ContractState, approver: ContractAddress) {
            self._only_owner();
            assert(!approver.is_zero(), Errors::ZERO_ADDRESS);
            assert(!self.authorized_approvers.read(approver), Errors::ALREADY_AUTHORIZED);
            
            self.authorized_approvers.write(approver, true);
            self.emit(AuthorizedApproverAdded { approver });
        }

        fn remove_authorized_approver(ref self: ContractState, approver: ContractAddress) {
            self._only_owner();
            assert(self.authorized_approvers.read(approver), Errors::NOT_AUTHORIZED);
            
            self.authorized_approvers.write(approver, false);
            self.emit(AuthorizedApproverRemoved { approver });
        }

        fn get_owner(self: @ContractState) -> ContractAddress {
            self.owner.read()
        }

        fn get_project_contract(self: @ContractState) -> ContractAddress {
            self.project_contract.read()
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn _only_owner(self: @ContractState) {
            let caller = get_caller_address();
            assert(caller == self.owner.read(), Errors::UNAUTHORIZED);
        }
    }
}