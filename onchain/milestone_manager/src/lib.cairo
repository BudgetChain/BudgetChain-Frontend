// Make modules public so they can be accessed
pub mod base {
    pub mod errors;
    pub mod types;
}

pub mod interfaces {
    pub mod IMilestoneManager;
}

pub mod budgetchain {
    pub mod MilestoneManager;
}

// Re-export the main modules for easier access
pub use budgetchain::MilestoneManager;
pub use interfaces::IMilestoneManager;
