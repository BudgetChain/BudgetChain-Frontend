/// Ledger smart contract implementation
#[starknet::contract]
pub mod Ledger {
    use core::num::traits::Zero;
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use crate::base::errors::{AMOUNT_CANNOT_BE_ZERO, RECIPIENT_CANNOT_BE_ZERO};
    use crate::base::types::{Transaction, TransactionCreated};
    use crate::interfaces::ILedger::ILedger;
    use core::starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, Map, Vec, VecTrait, MutableVecTrait, StorageMapReadAccess, StorageMapWriteAccess
    };
    use core::array::ArrayTrait;
    use core::array::Array;

    #[storage]
    struct Storage {
        transactions: Map<u64, Transaction>,
        transaction_count: u64,
        all_transaction_ids: Vec<u64>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        TransactionCreated: TransactionCreated,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.transaction_count.write(0);
    }

    #[abi(embed_v0)]
    impl LedgerImpl of ILedger<ContractState> {
        fn create_transaction(
            ref self: ContractState,
            project_id: u64,
            recipient: ContractAddress,
            amount: u128,
            category: felt252,
            description: felt252
        ) -> u64 {

            assert(amount > 0, AMOUNT_CANNOT_BE_ZERO);
            // Check if recipient is zero address
            let zero_address: ContractAddress = Zero::zero();
            assert(recipient != zero_address, RECIPIENT_CANNOT_BE_ZERO);

            // Get current transaction count and increment
            let current_count = self.transaction_count.read();
            let mut transaction_id = current_count + 1;
            self.transaction_count.write(transaction_id);

            // Get sender and timestamp
            let sender = get_caller_address();
            let timestamp = get_block_timestamp();

            // Create transaction
            let transaction = Transaction {
                id: transaction_id,
                project_id,
                sender,
                recipient,
                amount,
                timestamp,
                category,
                description,
            };

            // Store transaction
            self.transactions.write(transaction_id, transaction);
            
            // Add to all transactions list
            self.all_transaction_ids.append().write(transaction_id);
            
            // Emit event
            self.emit(TransactionCreated {
                id: transaction_id.into(),
                project_id,
                sender,
                recipient,
                amount,
                timestamp,
                category,
                description,
            });

            transaction_id
        }

        fn get_transaction_history(
            self: @ContractState,
            project_id: Option<u64>,
            offset: u64,
            limit: u64
        ) -> Array<Transaction> {
            
            let mut transactions = ArrayTrait::new();
            let total_count = self.all_transaction_ids.len();
            
            match project_id {
                Option::Some(pid) => {
                    // Filter transactions by project_id
                    let mut found_count = 0_u64;
                    let mut added_count = 0_u64;
                    
                    let mut i = 0_u64;
                    while i < total_count && added_count < limit {
                        let tx_id = self.all_transaction_ids.at(i).read();
                        let transaction = self.transactions.read(tx_id);
                        
                        if transaction.project_id == pid {
                            if found_count >= offset {
                                transactions.append(transaction);
                                added_count += 1;
                            }
                            found_count += 1;
                        }
                        i += 1;
                    };
                },
                Option::None => {
                    // Get all transactions with pagination
                    let start_idx = offset;
                    let end_idx = core::cmp::min(start_idx + limit, total_count);
                    
                    let mut i = start_idx;
                    while i < end_idx {
                        let tx_id = self.all_transaction_ids.at(i).read();
                        let transaction = self.transactions.read(tx_id);
                        transactions.append(transaction);
                        i += 1;
                    };
                }
            }
            
            transactions
        }

        fn get_transaction(self: @ContractState, transaction_id: u64) -> Option<Transaction> {
            if transaction_id == 0 || transaction_id > self.transaction_count.read() {
                Option::None
            } else {
                let transaction = self.transactions.read(transaction_id);
                if transaction.id == 0 {
                    Option::None
                } else {
                    Option::Some(transaction)
                }
            }
        }

        fn get_transaction_count(self: @ContractState) -> u64 {
            self.transaction_count.read()
        }

        fn get_project_transactions(
            self: @ContractState,
            project_id: u64,
            offset: u64,
            limit: u64
        ) -> Array<Transaction> {
            self.get_transaction_history(Option::Some(project_id), offset, limit)
        }
    }
} 