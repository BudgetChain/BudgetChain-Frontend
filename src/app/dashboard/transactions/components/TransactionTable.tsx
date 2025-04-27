"use client"

import React, { useState } from 'react';
import TransactionFilter from './TransactionFilter';
import { MoreVertical } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

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
  transactions: [
    { id: 1, currency: 'STRK', address: '0xeD8b...7DaF', amount: '30,000 STRK', note: 'Custom export label of smart contract/call', date: '12-12-24', time: '5:34 UTC', status: 'SUCCESSFUL' },
    { id: 2, currency: 'STRK', address: '0xeD8b...7DaF', amount: '20,000 STRK', note: 'Lorem ipsum dolor sit amet, consectetur...', date: '12-12-24', time: '5:34 UTC', status: 'CANCELLED' },
    { id: 3, currency: 'STRK', address: '0xeD8b...7DaF', amount: '2,000 STRK', note: 'Lorem ipsum dolor sit amet, consectetur...', date: '12-12-24', time: '5:34 UTC', status: 'SUCCESSFUL' },
    { id: 4, currency: 'STRK', address: '0xeD8b...7DaF', amount: '2,000 STRK', note: 'Lorem ipsum dolor sit amet, consectetur...', date: '12-12-24', time: '5:34 UTC', status: 'SUCCESSFUL' },
    { id: 5, currency: 'USDC', address: '0xeD8b...7DaF', amount: '$1,200', note: 'Lorem ipsum dolor sit amet, consectetur...', date: '12-12-24', time: '5:34 UTC', status: 'SUCCESSFUL' },
    { id: 6, currency: 'STRK', address: '0xeD8b...7DaF', amount: '2,000 STRK', note: 'Lorem ipsum dolor sit amet, consectetur...', date: '12-12-24', time: '5:34 UTC', status: 'CANCELLED' },
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
  success: '#10B981',
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

const TransactionTable: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'SUCCESSFUL' | 'CANCELED'>('ALL');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);


  const filteredTransactions = filter === 'ALL'
    ? transactions
    : transactions.filter((tx) => tx.status === filter);

  return (
    <div className="py-4 bg-[#171720]">
      <>
        {selectedTransaction && (
          <div className="h-[331px] grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Overview Card */}
            <div className="bg-transparent border border-[#EBEBEB40] rounded-lg p-6 relative">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">{projectData.name}</h2>
                <button className="text-gray-400 hover:text-white">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className='flex flex-col md:flex-row'>
                {/* Progress Circle */}
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
                          cornerRadius={25}
                          stroke="none"
                        >
                          <Cell key="completed" fill={COLORS.progress} />
                          <Cell key="remaining" fill="#171720" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Project Stats */}
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

            {/* Outcome Statistics Card */}
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
        )}


      </>
      <div className="overflow-x-auto rounded-lg bg-[#171720] border-2 border-[#EBEBEB40]">
        <div className="flex justify-between w-full items-center p-4">
          <h2>Ndida’s Transactions</h2>
          <div className="flex items-center space-x-3">
            <h3>Filter by:</h3>
            <TransactionFilter value={filter} onChange={setFilter} />
          </div>
        </div>

        <table className="min-w-full bg-[#171720] rounded-lg text-white text-sm border border-[#EBEBEB40]">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="p-4">S/N</th>
              <th className="p-4">Currency</th>
              <th className="p-4">Address</th>
              <th className="p-4">Amount Requested</th>
              <th className="p-4 hidden md:table-cell">Note</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody className="rounded-lg">
            {filteredTransactions.map((tx) => (
              <tr
              onClick={() => setSelectedTransaction(tx)}
                key={tx.id}
                className="border-b border-gray-700 hover:bg-gray-800"
              >
                <td className="p-4">{tx.id}</td>
                <td className="p-4">{tx.currency}</td>
                <td className="p-4 truncate max-w-[120px]">{tx.address}</td>
                <td className="p-4">{tx.amount}</td>
                <td className="p-4 hidden md:table-cell">{tx.note}</td>
                <td className="p-4">{tx.date}</td>
                <td className="p-4">{tx.time}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-semibold ${tx.status === 'SUCCESSFUL'
                      ? 'text-green-500'
                      : 'text-red-500'
                      }`}
                  >
                    ● {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
