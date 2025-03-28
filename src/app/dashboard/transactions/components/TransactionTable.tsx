import React from 'react';
import TransactionFilter from './TransactionFilter';

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
  return (
    <div className="py-4 bg-[#171720]">
      <div className="overflow-x-auto rounded-lg bg-[#171720] border-2 border-[#EBEBEB40]">
        <div className="flex justify-between w-full items-center p-4">
          <h2>Ndida’s Transactions</h2>
          <div className="flex items-center space-x-3">
            <h3>Filter by:</h3>
            <TransactionFilter />
          </div>
        </div>

        <table className="min-w-full bg-[#171720] rounded-lg text-white text-sm border border-[#EBEBEB40] ">
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
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-gray-700 hover:bg-gray-800 "
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
