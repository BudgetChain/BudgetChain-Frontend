import React from 'react';
import { ChevronDown } from 'lucide-react';

type Transaction = {
  id: number;
  project: string;
  currency: string;
  amount: string;
  amountUSD: string;
  address: string;
  note: string;
  timestamp: string;
  status: 'SUCCESSFUL' | 'CANCELED';
};

type TransactionSummary = {
  total: number;
  successful: number;
  canceled: number;
};

type TransactionDashboardProps = {
  transactions: Transaction[];
  summary: TransactionSummary;
};

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    project: 'Fragma',
    currency: 'STRK',
    amount: '20,000 STRK',
    amountUSD: '$10,200',
    address: 'OxcK4R....7G4F',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    timestamp: '5:34UTC',
    status: 'SUCCESSFUL'
  },
  {
    id: 2,
    project: 'Fragma',
    currency: 'STRK',
    amount: '20,000 STRK',
    amountUSD: '$10,200',
    address: 'OxcK4R....7G4F',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    timestamp: '5:34UTC',
    status: 'CANCELED'
  },
  {
    id: 3,
    project: 'Ndida',
    currency: 'STRK',
    amount: '2,000 STRK',
    amountUSD: '$1,200',
    address: 'OxcK4R....7G4F',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    timestamp: '5:34UTC',
    status: 'SUCCESSFUL'
  },
  {
    id: 4,
    project: 'Fragma',
    currency: 'USDC',
    amount: '',
    amountUSD: '$1,200',
    address: 'OxcK4R....7G4F',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    timestamp: '5:34UTC',
    status: 'SUCCESSFUL'
  },
  {
    id: 5,
    project: 'Ndida',
    currency: 'Fiat',
    amount: '',
    amountUSD: '$1,200',
    address: '01124*****',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    timestamp: '5:34UTC',
    status: 'SUCCESSFUL'
  },
  {
    id: 6,
    project: 'Steloz',
    currency: 'STRK',
    amount: '2,000 STRK',
    amountUSD: '$1,200',
    address: 'OxcK4R....7G4F',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    timestamp: '5:34UTC',
    status: 'CANCELED'
  },
  {
    id: 7,
    project: 'Ndida',
    currency: 'Fiat',
    amount: '',
    amountUSD: '$1,200',
    address: '03465*****',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    timestamp: '5:34UTC',
    status: 'SUCCESSFUL'
  },
  {
    id: 8,
    project: 'Fragma',
    currency: 'USDC',
    amount: '',
    amountUSD: '$1,200',
    address: 'OxcK4R....7G4F',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    timestamp: '5:34UTC',
    status: 'SUCCESSFUL'
  },
  {
    id: 9,
    project: 'Fragma',
    currency: 'STRK',
    amount: '',
    amountUSD: '$1,200',
    address: 'OxcK4R....7G4F',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    timestamp: '5:34UTC',
    status: 'SUCCESSFUL'
  },
  {
    id: 10,
    project: 'Ndida',
    currency: 'STRK',
    amount: '2,000 STRK',
    amountUSD: '$1,200',
    address: 'OxcK4R....7G4F',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    timestamp: '5:34UTC',
    status: 'SUCCESSFUL'
  },
  {
    id: 11,
    project: 'Ndida',
    currency: 'USDC',
    amount: '',
    amountUSD: '$1,200',
    address: 'OxcK4R....7G4F',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    timestamp: '5:34UTC',
    status: 'SUCCESSFUL'
  },
  {
    id: 12,
    project: 'Ndida',
    currency: 'USDC',
    amount: '',
    amountUSD: '$1,200',
    address: 'OxcK4R....7G4F',
    note: 'Lorem ipsum dolor sit amet, consectetur...',
    timestamp: '5:34UTC',
    status: 'CANCELED'
  }
];

export const mockSummary: TransactionSummary = {
  total: 231,
  successful: 219,
  canceled: 12
};


const SummaryCard: React.FC<{
  title: string;
  value: number;
  color: string;
}> = ({ title, value, color }) => {
  return (
    <div className={`rounded-lg ${color} p-6 h-[10em] justify-center  flex flex-col `}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-[400] text-[16px] ">{title}</h3>
        <button className="text-white text-xs flex items-center">
          All <ChevronDown className="ml-1 h-4 w-4" />
        </button>
      </div>
      <div className="text-white text-[24px] font-[600]">{value}</div>
    </div>
  );
};


const StatusIndicator: React.FC<{ status: 'SUCCESSFUL' | 'CANCELED' }> = ({ status }) => {
  const color = status === 'SUCCESSFUL' ? 'text-green-500' : 'text-red-500';
  return (
    <div className="flex items-center">
      <span className={`h-2 w-2 rounded-full ${status === 'SUCCESSFUL' ? 'bg-green-500' : 'bg-red-500'} mr-2`}></span>
      <span className={color}>{status}</span>
    </div>
  );
};

const TransactionDashboard: React.FC<TransactionDashboardProps> = ({ transactions = mockTransactions, summary = mockSummary }) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SummaryCard 
          title="Total Transactions" 
          value={summary.total} 
          color="bg-gradient-to-b from-purple-700 to-indigo-500" 
        />
        <SummaryCard 
          title="Total Canceled" 
          value={summary.canceled} 
          color="bg-gradient-to-b from-purple-700 to-indigo-500" 
        />
        <SummaryCard 
          title="Total Successful" 
          value={summary.successful} 
          color="bg-gradient-to-b from-purple-700 to-indigo-500" 
        />
      </div>

      <div className="rounded-lg overflow-hidden">

        <div className="p-4 flex justify-between items-center overflow-hidden">
          <div className="flex items-center space-x-4">
            <h3 className="text-white font-bold text-[14px]">All DAOs</h3>
            <button className="text-xs flex items-center text-[#42415B]">
              ALL Project <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center">
            <span className="text-white text-sm mr-2">Filter by:</span>
            <button className=" text-xs flex items-center border-[0.5px] border-[#42415B] text-[#848484] p-2 rounded-md">
              Date Added <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>

        
        <div className="overflow-x-auto rounded-lg border-[0.5px] border-gray-800">
          <table className="w-full table-auto ">
            <thead>
              <tr className="text-left text-white text-[14px] border-b border-gray-800 font-[400]">
                <th className="px-4 py-3">S/N</th>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Currency</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Address/Account</th>
                <th className="px-4 py-3">Note</th>
                <th className="px-4 py-3">Date/Time</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-800 hover:bg-gray-800">
                  <td className="px-4 py-4">{tx.id}.</td>
                  <td className="px-4 py-4">{tx.project}</td>
                  <td className="px-4 py-4">{tx.currency}</td>
                  <td className="px-4 py-4">
                    {tx.amount && <div>{tx.amount}</div>}
                    <div>{tx.amountUSD}</div>
                  </td>
                  <td className="px-4 py-4">{tx.address}</td>
                  <td className="px-4 py-4 italic text-gray-400">{tx.note}</td>
                  <td className="px-4 py-4">{tx.timestamp}</td>
                  <td className="px-4 py-4 ">
                    <StatusIndicator status={tx.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default TransactionDashboard;