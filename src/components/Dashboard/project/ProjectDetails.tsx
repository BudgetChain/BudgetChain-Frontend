import React from 'react';
import Button from '@/components/form/Button';
import { MoreVertical } from 'lucide-react';

interface ProjectDetailsProps {
  projectId: number;
  onBack: () => void;
}

interface Transaction {
  id: number;
  currency: string;
  address: string;
  amountRequested: {
    strk: number;
    usd: number;
  };
  note: string;
  date: string;
  time: string;
  status: 'SUCCESSFUL' | 'CANCELED';
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  projectId,
  onBack,
}) => {
  const projectStats = {
    readyForPublishing: 80,
    successfulTransactions: 17,
    canceledTransactions: 3,
    appeals: 5,
    remainingTime: '4 Weeks',
  };

  const outcomeStats = {
    strk: 75,
    usdc: 33,
    fiat: 16,
  };

  const transactions: Transaction[] = [
    {
      id: 1,
      currency: 'STRK',
      address: 'OxcK4R....7G4F',
      amountRequested: {
        strk: 20000,
        usd: 10200,
      },
      note: 'Gorem ipsum dolor sit amet, consectetur....',
      date: '12-12-24',
      time: '5:34UTC',
      status: 'SUCCESSFUL',
    },
  ];

  return (
    <div className="space-y-6">
      <button
        className="flex items-center text-gray-400 hover:text-white"
        onClick={onBack}
      >
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back
      </button>

      <div className="grid grid-cols-2 gap-6">
        <div className="ring-2 ring-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Ndida Project</h3>
            <button className="text-gray-400 hover:text-white">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-12">
            <div className="relative w-[180px] h-[180px]">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="90"
                  cy="90"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="20"
                  fill="none"
                  className="text-[#2B2B46]"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 80}
                  strokeDashoffset={
                    2 *
                    Math.PI *
                    80 *
                    (1 - projectStats.readyForPublishing / 100)
                  }
                  className="text-[#D103B2]"
                />
              </svg>
            </div>

            <ul className="space-y-2 text-[#fff] text-[14px]">
              <li>{projectStats.readyForPublishing}% Ready for Publishing</li>
              <li>
                {projectStats.successfulTransactions} Successful Transactions
              </li>
              <li>{projectStats.canceledTransactions} Canceled Transactions</li>
              <li>{projectStats.appeals} Appeals</li>
              <li>{projectStats.remainingTime} remaining time.</li>
            </ul>
          </div>
        </div>

        <div className="ring-2 ring-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-semibold">Outcome Statistics</h3>
            <button className="text-gray-400 hover:text-white">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-2 bg-[#2B2B46] rounded-full">
                <div
                  className="h-full bg-[#7E04F0] rounded-full"
                  style={{ width: `${outcomeStats.strk}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#848484]">STRK</span>
                <span className="text-white">{outcomeStats.strk}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-2 bg-[#2B2B46] rounded-full">
                <div
                  className="h-full bg-[#0E02F2] rounded-full"
                  style={{ width: `${outcomeStats.usdc}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#848484]">USDC</span>
                <span className="text-white">{outcomeStats.usdc}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-2 bg-[#2B2B46] rounded-full">
                <div
                  className="h-full bg-[#EC6105] rounded-full"
                  style={{ width: `${outcomeStats.fiat}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#848484]">Fiat</span>
                <span className="text-white">{outcomeStats.fiat}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ring-2 ring-white/10 rounded-lg">
        <div className="flex items-center justify-between mb-3 p-6">
          <h3 className="text-xl font-semibold">Ndida's Transactions</h3>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Filter by:</span>
            <select className="bg-gray-800 rounded-md px-3 py-1">
              <option>Date Added</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-[#2B2B46]">
                <th className="py-3 px-6">S/N</th>
                <th className="py-3 px-6">Currency</th>
                <th className="py-3 px-6">Address</th>
                <th className="py-3 px-6">Amount Requested</th>
                <th className="py-3 px-6">Note</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Time</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-t border-[#42415B]">
                  <td className="py-4 px-6">{transaction.id}</td>
                  <td className="py-4 px-6">{transaction.currency}</td>
                  <td className="py-4 px-6">{transaction.address}</td>
                  <td className="py-4 px-6">
                    <div>
                      {transaction.amountRequested.strk} STRK
                      <div className="text-sm text-gray-400">
                        ${transaction.amountRequested.usd}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{transaction.note}</td>
                  <td className="py-4 px-6">{transaction.date}</td>
                  <td className="py-4 px-6">{transaction.time}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'SUCCESSFUL'
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-red-900/30 text-red-400'
                      }`}
                    >
                      {transaction.status}
                    </span>
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

export default ProjectDetails;
