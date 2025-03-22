'use client';

import React, { useState } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TransactionTable from '../components/transaction';
import Document from '../document/page';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('records');
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="flex-grow min-h-screen bg-[#171720] text-white p-2 sm:p-4">
      <main className="max-w-6xl mx-auto">
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-6">
          <StatCard title="Total Transactions" value="3" />
          <StatCard title="Total Successful" value="2" />
          <StatCard title="Total Cancelled" value="1" />
          <StatCard title="Total Time Left" value="2 Weeks" />
        </div>

        <div className="flex space-x-6 mb-6 overflow-x-auto">
          <div
            className={`${activeTab === 'records' ? 'border-b-4 border-blue-900' : 'text-gray-400'} pb-2 whitespace-nowrap cursor-pointer`}
            onClick={() => setActiveTab('records')}
          >
            Records
          </div>
          <div
            className={`${activeTab === 'documents' ? 'border-b-4 border-blue-900' : 'text-gray-400'} pb-2 whitespace-nowrap cursor-pointer`}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </div>
        </div>

        <div className="flex items-center mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-400 hover:text-white"
          >
            <ArrowLeft size={20} className="mr-2" />
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
    <div className="w-[240px] h-[160px] bg-gradient-to-b from-purple-700 to-indigo-800 flex flex-col justify-center rounded-lg p-4 shadow-lg">
      <h3 className="text-sm text-purple-300 mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
