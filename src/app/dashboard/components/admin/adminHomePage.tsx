'use client'

import AdminSummary from './summary';
import AIChat from './chartSection';
import TransactionTable from './transactionTable';

function AdminHomePage() {
  return (
    
      <div className="flex-1 md:p-6">
       <AdminSummary/>
        <AIChat/>
       <TransactionTable/>
      </div>
  );
}

export default AdminHomePage;