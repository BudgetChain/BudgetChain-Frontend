'use client';

import React, { useState } from 'react';
import TransactionFilter from './TransactionFilter';

interface Transaction {
  id: number;
  currency: string;
  address: string;
  projects: string;
  amount: string;
  note: string;
  date: string;
  time: string;
  status: 'SUCCESSFUL' | 'CANCELED';
}

const transactions: Transaction[] = [
  {
    id: 1,
    currency: 'STRK',
    projects: 'Fragma',
    address: '0xcK4R....7G4F',
    amount: '20,000 STRK ($10,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '18/02/2025',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 2,
    currency: 'STRK',
    projects: 'Stelo',
    address: '0xcK4R....7G4F',
    amount: '20,000 STRK ($10,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '18/02/2025',
    time: '5:34 UTC',
    status: 'CANCELED',
  },
  {
    id: 3,
    currency: 'STRK',
    projects: 'Ndida',
    address: '0xcK4R....7G4F',
    amount: '2,000 STRK ($1,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '18/02/2025',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 4,
    currency: 'USDC',
    projects: 'Fragma',
    address: '0xcK4R....7G4F',
    amount: '$1,200',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '18/02/2025',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 5,
    currency: 'Fiat',
    projects: 'Nidid',
    address: '00234*****',
    amount: '$1,200',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '18/02/2025',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 6,
    currency: 'STRK',
    projects: 'Fragma',
    address: '0xcK4R....7G4F',
    amount: '20,000 STRK ($10,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '18/02/2025',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 7,
    currency: 'STRK',
    projects: 'Fragma',
    address: '0xcK4R....7G4F',
    amount: '20,000 STRK ($10,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '18/02/2025',
    time: '5:34 UTC',
    status: 'CANCELED',
  },
  {
    id: 8,
    currency: 'STRK',
    projects: 'hulio',
    address: '0xcK4R....7G4F',
    amount: '2,000 STRK ($1,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '18/02/2025',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 9,
    currency: 'USDC',
    projects: 'Fragma',
    address: '0xcK4R....7G4F',
    amount: '$1,200',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '18/02/2025',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 10,
    currency: 'Fiat',
    projects: 'Stelo',
    address: '00234*****',
    amount: '$1,200',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '18/02/2025',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
  {
    id: 11,
    currency: 'STRK',
    projects: 'Fragma',
    address: '0xcK4R....7G4F',
    amount: '20,000 STRK ($10,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '18/02/2025',
    time: '5:34 UTC',
    status: 'CANCELED',
  },
  {
    id: 12,
    currency: 'STRK',
    projects: 'Fragma',
    address: '0xcK4R....7G4F',
    amount: '20,000 STRK ($10,200)',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    date: '18/02/2025',
    time: '5:34 UTC',
    status: 'SUCCESSFUL',
  },
];

const TransactionTable: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRowExpansion = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="w-full px-4 sm:px-5 py-4">
      <div className="w-full rounded-lg border border-[#747479] bg-[#171720]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between bg-[#171720] w-full items-start sm:items-center p-4 gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <h2 className="text-[#EBEBEB] text-lg sm:text-xl font-semibold">
              All Transactions
            </h2>
            <div className="sm:hidden">
              <TransactionFilter />
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <h3 className="text-[#EBEBEB] text-sm">Filter by:</h3>
            <TransactionFilter />
          </div>
        </div>

        {/* Desktop/Tablet Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full bg-[#171720] text-white text-sm">
            <thead>
              <tr className="bg-[#2B2B46] text-left border-t border-[#747479]">
                <th className="p-3 lg:p-4 text-xs lg:text-sm font-semibold">S/N</th>
                <th className="p-3 lg:p-4 text-xs lg:text-sm font-semibold">Projects</th>
                <th className="p-3 lg:p-4 text-xs lg:text-sm font-semibold">Currency</th>
                <th className="p-3 lg:p-4 text-xs lg:text-sm font-semibold">Amount</th>
                <th className="p-3 lg:p-4 text-xs lg:text-sm font-semibold hidden lg:table-cell">Address</th>
                <th className="p-3 lg:p-4 text-xs lg:text-sm font-semibold hidden xl:table-cell">Note</th>
                <th className="p-3 lg:p-4 text-xs lg:text-sm font-semibold">Date/Time</th>
                <th className="p-3 lg:p-4 text-xs lg:text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-[#747479] hover:bg-[#2B2B46] transition-colors"
                >
                  <td className="p-3 lg:p-4 text-xs lg:text-sm">{tx.id}</td>
                  <td className="p-3 lg:p-4 text-xs lg:text-sm font-medium">{tx.projects}</td>
                  <td className="p-3 lg:p-4 text-xs lg:text-sm">
                    <span className="px-2 py-1 bg-[#374151] rounded-full text-xs">
                      {tx.currency}
                    </span>
                  </td>
                  <td className="p-3 lg:p-4 text-xs lg:text-sm font-medium">{tx.amount}</td>
                  <td className="p-3 lg:p-4 text-xs lg:text-sm hidden lg:table-cell font-mono">
                    {tx.address}
                  </td>
                  <td className="p-3 lg:p-4 text-xs lg:text-sm hidden xl:table-cell max-w-[200px] truncate">
                    {tx.note}
                  </td>
                  <td className="p-3 lg:p-4 text-xs lg:text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium">{tx.date}</span>
                      <span className="text-gray-400 text-xs">{tx.time}</span>
                    </div>
                  </td>
                  <td className="p-3 lg:p-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        tx.status === 'SUCCESSFUL'
                          ? 'text-green-400 bg-green-900/30'
                          : 'text-red-400 bg-red-900/30'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full mr-2 bg-current"></span>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="border-b border-[#747479] last:border-b-0"
            >
              <div
                className="p-4 cursor-pointer hover:bg-[#2B2B46] transition-colors"
                onClick={() => toggleRowExpansion(tx.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-400 text-sm">#{tx.id}</span>
                      <span className="text-white font-medium">{tx.projects}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-[#374151] rounded-full text-xs">
                        {tx.currency}
                      </span>
                      <span className="text-white font-medium text-sm">{tx.amount}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        tx.status === 'SUCCESSFUL'
                          ? 'text-green-400 bg-green-900/30'
                          : 'text-red-400 bg-red-900/30'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full mr-1 bg-current"></span>
                      {tx.status}
                    </span>
                    <div className="text-right text-xs text-gray-400">
                      <div>{tx.date}</div>
                      <div>{tx.time}</div>
                    </div>
                  </div>
                </div>
                
                {/* Expand/Collapse indicator */}
                <div className="flex justify-center">
                  <span className="text-gray-400 text-xs">
                    {expandedRow === tx.id ? '▲ Less' : '▼ More'}
                  </span>
                </div>
              </div>

              {/* Expanded content */}
              {expandedRow === tx.id && (
                <div className="px-4 pb-4 border-t border-[#374151] bg-[#1a1a24]">
                  <div className="pt-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-gray-400 text-sm">Address:</span>
                      <span className="text-white text-sm font-mono ml-2 break-all">
                        {tx.address}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-400 text-sm">Note:</span>
                      <span className="text-white text-sm ml-2 text-right max-w-[200px]">
                        {tx.note}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;