"use client"

import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import TransactionFilter from './transactionFilter';

interface Transaction {
  id: number;
  currency: string;
  address: string;
  amount: string;
  note: string;
  date: string;
  time: string;
  status: 'SUCCESSFUL' | 'CANCELED';
}

const projectData = {
  name: 'Ndida Project',
  progress: 80, // Updated to match the 80% in the design
  statistics: [
    { name: 'STRK', value: 75 },
    { name: 'USDC', value: 15 },
    { name: 'FIAT', value: 10 },
  ],
  stats: {
    ready: 80,
    successful: 17,
    cancelled: 3,
    appeals: 5,
    weeks: 4
  }
};

const COLORS = {
  STRK: '#7E04F0',
  USDC: '#0E02F2',
  FIAT: '#EC6105',
  background: '#1A1A1A',
  cardBackground: '#121212',
  text: '#FFFFFF',
  subtext: '#9CA3AF',
  border: '#2D3748',
  success: '#282828',
  failed: '#EF4444',
  progress: '#D103B2',
  remaining: '#333333'
};

const transactions: Transaction[] = [
  {
    id: 1,
    currency: 'STRK',
    address: '0xcK4R....7G4F',
    amount: '20,000 STRK ($10,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '12-12-24',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 2,
    currency: 'STRK',
    address: '0xcK4R....7G4F',
    amount: '20,000 STRK ($10,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '12-12-24',
    time: '5:34 UTC',
    status: 'CANCELED',
  },
  {
    id: 3,
    currency: 'STRK',
    address: '0xcK4R....7G4F',
    amount: '2,000 STRK ($1,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '12-12-24',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 4,
    currency: 'USDC',
    address: '0xcK4R....7G4F',
    amount: '$1,200',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '12-12-24',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 5,
    currency: 'Fiat',
    address: '00234*****',
    amount: '$1,200',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '12-12-24',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 6,
    currency: 'STRK',
    address: '0xcK4R....7G4F',
    amount: '20,000 STRK ($10,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '12-12-24',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 7,
    currency: 'STRK',
    address: '0xcK4R....7G4F',
    amount: '20,000 STRK ($10,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '12-12-24',
    time: '5:34 UTC',
    status: 'CANCELED',
  },
  {
    id: 8,
    currency: 'STRK',
    address: '0xcK4R....7G4F',
    amount: '2,000 STRK ($1,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '12-12-24',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 9,
    currency: 'USDC',
    address: '0xcK4R....7G4F',
    amount: '$1,200',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '12-12-24',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 10,
    currency: 'Fiat',
    address: '00234*****',
    amount: '$1,200',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '12-12-24',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 11,
    currency: 'STRK',
    address: '0xcK4R....7G4F',
    amount: '20,000 STRK ($10,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '12-12-24',
    time: '5:34 UTC',
    status: 'CANCELED',
  },
  {
    id: 12,
    currency: 'STRK',
    address: '0xcK4R....7G4F',
    amount: '20,000 STRK ($10,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '12-12-24',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
];

const ProjectPageTransactionTable: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'SUCCESSFUL' | 'CANCELED'>('ALL');

  const filteredTransactions = filter === 'ALL'
    ? transactions
    : transactions.filter((tx) => tx.status === filter);

  return (
    <div className="py-4 bg-[#171720]">
      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Project Overview Card */}
        <div className="bg-transparent border border-[#EBEBEB40] rounded-lg p-6 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">{projectData.name}</h2>
            <button className="text-gray-400 hover:text-white">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="flex flex-col md:flex-row">
            {/* Progress Circle */}
            <div className="flex items-center justify-center relative mb-6 md:mb-0">

              <div className="flex items-center justify-center relative">
                <div className="w-40 h-40 md:w-48 md:h-48 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Progress', value: projectData.progress },
                          { name: 'Remaining', value: 100 - projectData.progress },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={70}
                        paddingAngle={0}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        stroke="none"
                      >
                        <Cell key="completed" fill={COLORS.progress} radius={80} />
                        <Cell key="remaining" fill={COLORS.success} className='bg-red-900' radius={0} />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2 self-center md:pl-4">
              <div className="flex items-center space-x-3 text-sm">
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span>{projectData.stats.ready}% Ready for Publishing</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span>{projectData.stats.successful} Successful Transactions</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span>{projectData.stats.cancelled} Cancelled Transactions</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span>{projectData.stats.appeals} Appeals</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span>{projectData.stats.weeks} Weeks remaining time.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Currency Distribution Card */}
        <div className="bg-transparent border border-[#EBEBEB40] rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Outcome Statistics</h2>
            <button className="text-gray-400 hover:text-white">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="space-y-6">
            {projectData.statistics.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-4">
                  {/* Progress Bar */}
                  <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${stat.value}%`,
                        backgroundColor: COLORS[stat.name as keyof typeof COLORS]
                      }}
                    />
                  </div>

                  {/* Percentage */}
                  <div className="text-sm font-medium text-white min-w-[40px] text-right">
                    {stat.value}%
                  </div>
                </div>

                {/* Stat Name */}
                <span className="text-sm text-gray-400">{stat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-transparent border border-[#EBEBEB40] rounded-lg p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-lg font-medium mb-4 md:mb-0">Transaction Records</h2>
          <TransactionFilter value={filter} onChange={setFilter} />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-transparent text-white text-sm">
            <thead>
              <tr className="bg-[#1c1c26] text-left">
                <th className="p-4">S/N</th>
                <th className="p-4">Currency</th>
                <th className="p-4">Address</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Note</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx, index) => (
                <tr
                key={tx.id}
                className="border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
                onClick={() => {}}
                >
                <td className="p-4">{index+1}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                     
                      {tx.currency}
                    </div>
                  </td>
                  <td className="p-4">{tx.address}</td>
                  <td className="p-4">{tx.amount}</td>
                  <td className="p-4 max-w-xs truncate">{tx.note}</td>
                  <td className="p-4">{tx.date}</td>
                  <td className="p-4">{tx.time}</td>
                  <td className="p-4">
                    <span className={`flex items-center ${tx.status === 'SUCCESSFUL' ? 'text-green-500' : 'text-red-500'}`}>
                      <span className="h-2 w-2 rounded-full bg-current mr-2"></span>
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-gray-400 hover:text-white">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="text-gray-400">
            Showing <span className="text-white">1-10</span> of <span className="text-white">{filteredTransactions.length}</span> transactions
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700">Previous</button>
            <button className="px-3 py-1 bg-[#4F4AE6] rounded">1</button>
            <button className="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700">2</button>
            <button className="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700">3</button>
            <button className="px-3 py-1 border border-gray-700 rounded hover:bg-gray-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPageTransactionTable;