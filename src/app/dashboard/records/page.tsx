'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TransactionTable from '../components/transaction';
import Document from '../document/page';

export default function Home() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('records');
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="flex-grow min-h-screen bg-[#171720] text-white">
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* <div className="md:hidden flex justify-end mb-3 sm:mb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 p-2"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div> */}

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <StatCard title="Total Transactions" value="3" />
          <StatCard title="Total Successful" value="2" />
          <StatCard title="Total Cancelled" value="1" />
          <StatCard title="Total Time Left" value="2 Weeks" />
        </div>

        <div className="flex space-x-4 sm:space-x-6 mb-4 sm:mb-6 overflow-x-auto text-sm sm:text-base">
          <div
            className={`${
              activeTab === 'records' ? 'border-b-4 border-blue-900' : 'text-gray-400'
            } pb-2 min-w-[100px] whitespace-nowrap cursor-pointer`}
            onClick={() => setActiveTab('records')}
          >
            Records
          </div>
          <div
            className={`${
              activeTab === 'documents' ? 'border-b-4 border-blue-900' : 'text-gray-400'
            } pb-2 min-w-[100px] whitespace-nowrap cursor-pointer`}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </div>
        </div>

        <div className="flex items-center mb-4 sm:mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-400 hover:text-white p-2"
            aria-label="Go back"
          >
            <ArrowLeft size={18}  className="mr-2" />
            Back
          </button>
        </div>

        {activeTab === 'records' && <TransactionTable />}
        {activeTab === 'documents' && <Document />}
      </main>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="w-full max-w-[240px] min-h-[120px] sm:min-h-[140px] bg-gradient-to-b from-purple-700 to-indigo-800 flex flex-col justify-center rounded-lg p-4 sm:p-6 shadow-lg">
      <h3 className="text-xs sm:text-sm text-purple-300 mb-2 truncate">{title}</h3>
      <p className="text-lg sm:text-xl lg:text-2xl font-bold">{value}</p>
    </div>
  );
}