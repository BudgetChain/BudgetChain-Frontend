import React from 'react';
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
  return (
    <div className="py-4 px-5">
      <div className="overflow-x-auto rounded-lg bg-gray-900 border border-[#EBEBEB40]">
        <div className="flex justify-between w-full items-center p-4">
          <div className="flex items-center space-x-3">
            <h2 className="text-[#EBEBEB]">All Transactions</h2>
            <TransactionFilter />
          </div>
          <div className="flex items-center space-x-3">
            <h3>Filter by:</h3>
            <TransactionFilter />
          </div>
        </div>

        <table className="min-w-full bg-gray-900 rounded-lg text-white text-sm border border-[#EBEBEB40] ">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="p-4">S/N</th>
              <th className="p-4">Projects</th>
              <th className="p-4 hidden md:table-cell">Currency</th>
              <th className="p-4">Amount Sent</th>
              <th className="p-4">Address/Account</th>
              <th className="p-4">Note</th>
              <th className="p-4">Date/time</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody className="rounded-lg">
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-gray-700 hover:bg-gray-800 "
              >
                <td className="p-4">{tx.id}</td>
                <td className="p-4">{tx.projects}</td>
                <td className="p-4 truncate max-w-[120px]">{tx.currency}</td>
                <td className="p-4">{tx.amount}</td>
                <td className="p-4 hidden md:table-cell">{tx.address}</td>
                <td className="p-4">{tx.note}</td>
                <td className="p-4">
                  <div>{tx.date}</div>
                  <span>{tx.time}</span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      tx.status === 'SUCCESSFUL'
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
