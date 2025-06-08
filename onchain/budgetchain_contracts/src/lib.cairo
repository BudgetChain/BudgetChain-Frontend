// Make modules public so they can be accessed
pub mod base {
    pub mod errors;
    pub mod types;
}

pub mod interfaces {
    pub mod IBudget;
    pub mod ILedger;
}

pub mod budgetchain {
    pub mod Budget;
    pub mod Ledger;
}

// Re-export the main modules for easier access
pub use budgetchain::{Budget, Ledger};
pub use interfaces::{IBudget, ILedger};
pub use base::types::Transaction;
