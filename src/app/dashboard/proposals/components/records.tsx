import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import ProposalDetails from './ProposalDetails';
import ProposalForm from './ProposalForm';

export default function ProposalRecords() {
  const [activeTab, setActiveTab] = useState('records');
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);

  const handleRowClick = (id: number) => {
    setSelectedProposal(id);
  };

  return (
    <div className=" text-white bg-transparent mx-3 rounded-lg shadow-lg max-w-full ">
      <div className="flex border-b border-gray-700 w-fit">
        <button
          className={`flex items-center gap-2 px-6 py-2 text-sm ${
            activeTab === 'records'
              ? 'border-b-2 border-purple-500'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('records')}
        >
          Records{' '}
          <span className="bg-gray-600 px-2 py-0.5 text-xs rounded-full">
            2
          </span>
        </button>
        <button
          className={`px-4 py-2 text-sm ${
            activeTab === 'appeal'
              ? 'border-b-2 border-purple-500'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('appeal')}
        >
          Compose an Appeal
        </button>
      </div>

      {/* Table Container */}
      {activeTab === 'records' && (
        <div className="my-4">
          {selectedProposal === null ? (
            <div className=" mt-4 rounded-lg  border border-[#EBEBEB40]">
              <div className="flex px-6 py-4 justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-[#EBEBEB]">
                  All Proposals
                </h2>
                <div className="relative flex items-center space-x-2">
                  <label className="text-sm text-gray-400">Filter by:</label>
                  <button className="border border-[#42415B] text-white text-sm px-3 py-1 rounded-md flex items-center">
                    Date Updated <ChevronDownIcon className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className=" rounded-lg">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#2B2B46] w-full text-gray-300 text-sm">
                      <th className="px-6 py-3 text-left">S/N</th>
                      <th className="px-6 py-3 text-left">Appeal Specs</th>
                      <th className="px-6 py-3 text-left">
                        Appeal Amount/Time
                      </th>
                      <th className="px-6 py-3 text-left">Description/Note</th>
                      <th className="px-6 py-3 text-left">Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      onClick={() => handleRowClick(1)}
                      className="text-gray-300 cursor-pointer "
                    >
                      <td className="px-6 py-3">1.</td>
                      <td className="px-6 py-3">More Funds</td>
                      <td className="px-6 py-3">$20,000</td>
                      <td className="px-6 py-3 italic text-gray-400">
                        Gorem ipsum dolor sit amet, consectetur....
                      </td>
                      <td className="px-4 py-3 text-left">
                        <span className="bg-[#EBEBEB] px-3 py-1 rounded-full text-[#2B2B46]">
                          2
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <ProposalDetails setSelectedProposal={setSelectedProposal} />
          )}
        </div>
      )}

      {activeTab == 'appeal' && <ProposalForm />}
    </div>
  );
}
