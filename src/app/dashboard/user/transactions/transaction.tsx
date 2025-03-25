import React from 'react';
import Sidebar from '../../components/sideBar';
import NavBar from '../../components/navBar';
import TransactionCard, { 
  mockTransactions, 
  mockSummary 
} from './transaction-card';

const TransactionPage = () => {
  return (
    <div className="flex bg-[#171720] font-montserrat">
      <Sidebar />
      <div className="w-full bg-[#171720] px-10">
        <NavBar />
        <TransactionCard
          transactions={mockTransactions}
          summary={mockSummary}
        />
      </div>
    </div>
  );
};

export default TransactionPage;