// contract custom errors
pub const ERROR_ONLY_ADMIN: felt252 = 'ONLY ADMIN';
pub const ERROR_ZERO_ADDRESS: felt252 = 'Zero address forbidden';

// Transaction creation errors
pub const AMOUNT_CANNOT_BE_ZERO: felt252 = 'Amount must be greater than 0';
pub const RECIPIENT_CANNOT_BE_ZERO: felt252 = 'Recipient cannot be zero addr';

// Transaction query errors
pub const TRANSACTION_NOT_FOUND: felt252 = 'Transaction not found';
pub const INVALID_PAGINATION: felt252 = 'Invalid pagination parameters'; 