// Make modules public so they can be accessed
pub mod base {
    pub mod errors;
    pub mod types;
}

pub mod interfaces {
    pub mod IBudget;
}

pub mod budgetchain {
    pub mod Budget;
}

// Re-export the main modules for easier access
pub use budgetchain::Budget;
pub use interfaces::IBudget;
