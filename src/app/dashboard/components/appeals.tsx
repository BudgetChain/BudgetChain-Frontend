'use client';

import { useState } from 'react';
import { Download, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type AppealStatus = 'APPROVED' | 'REJECTED' | 'PENDING';
type Appeal = {
  id: number;
  project: string;
  date: string;
  time: string;
  appeal: string;
  amount: string;
  note: string;
  address: string;
  currency: string;
  status: AppealStatus;
};

export default function Appeals() {
  const appeals: Appeal[] = [
    // Same data as provided, omitted for brevity
  ];

  const [selectedAppeal, setSelectedAppeal] = useState<Appeal>(appeals[0]);
  const [filter, setFilter] = useState<string>('ALL');
  const router = useRouter();

  const exportToCSV = () => {
    const headers = ['ID', 'Project', 'Date', 'Time', 'Appeal', 'Amount', 'Note', 'Address', 'Currency', 'Status'];
    const csvRows = appeals.map((appeal) => [
      appeal.id,
      appeal.project,
      appeal.date,
      appeal.time,
      appeal.appeal,
      appeal.amount,
      appeal.note,
      appeal.address,
      appeal.currency,
      appeal.status,
    ]);
    const csvContent = [
      headers.join(','),
      ...csvRows.map((row) =>
        row
          .map((cell) => (cell !== null && cell !== undefined ? `"${String(cell).replace(/"/g, '""')}"` : ''))
          .join(','),
      ),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `appeals-export-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 bg-[#171720] text-white min-h-screen min-w-[300px] max-w-full">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 rounded-xl shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)]">
        <div className="col-span-1 lg:col-span-3 bg-gradient-to-r from-[#171720] to-[#5E5EFF] border-[#2A2D3A] p-4 sm:p-6 rounded-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg sm:text-xl font-medium text-[#E6E6E6]">Total Appeals</h2>
                <select
                  className="bg-transparent text-xs sm:text-sm text-gray-400 border-none outline-none"
                  aria-label="Filter appeals"
                >
                  <option className="text-xs sm:text-sm text-[#848484]">ALL</option>
                </select>
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#EBEBEB]">8</div>
              <button
                className="mt-4 sm:mt-6 text-xs sm:text-sm flex items-center gap-2 text-[#EBEBEB] px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-transparent border border-[#4F4AE6]"
                onClick={exportToCSV}
              >
                Download Appeals
                <Download className="h-3 sm:h-4 w-3 sm:w-4 text-[#EBEBEB]" />
              </button>
            </div>
            <div className="max-w-[80px] sm:max-w-[100px] aspect-square">
              <Image
                src="/appeal.svg"
                alt="Justice scales"
                width={100}
                height={100}
                className="h-full w-full object-contain"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-4">
        {/* Table */}
        <div className="bg-[#171720] shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)] rounded-xl overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-[#2A2D3A] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h2 className="text-lg sm:text-xl font-medium">Total Appeals by Projects</h2>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm text-gray-400">Filter by:</span>
              <div className="relative">
                <select
                  className="appearance-none bg-[#171720] shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)] rounded-md px-3 sm:px-4 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 min-w-[120px]"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  aria-label="Filter appeals by status"
                >
                  <option value="ALL">First Uploaded</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="PENDING">Pending</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="h-3 sm:h-4 w-3 sm:w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-[#2B2B46] border-b border-[#2A2D3A]">
                <tr>
                  {['S/N', 'Project', 'Date', 'Time', 'Appeal', 'Note', 'Address', 'Currency', 'Status'].map((header) => (
                    <th key={header} className="py-2 sm:py-3 px-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-[#EBEBEB]">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appeals
                  .filter((appeal) => filter === 'ALL' || appeal.status === filter)
                  .map((appeal) => (
                    <tr
                      key={appeal.id}
                      className="border-b border-[#2A2D3A] hover:bg-[#2A2D3A]/30 cursor-pointer"
                      onClick={() => {
                        setSelectedAppeal(appeal);
                        router.push(`/dashboard/appeals/appealsDetails`);
                      }}
                    >
                      <td className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm text-[#EBEBEB]">{appeal.id}.</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm text-[#EBEBEB] text-wrap">{appeal.project}</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm text-[#EBEBEB]">{appeal.date}</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm text-[#EBEBEB]">{appeal.time}</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm text-[#EBEBEB]">
                        {appeal.appeal}
                        {appeal.amount && <div className="text-gray-400 text-xs sm:text-sm">{appeal.amount}</div>}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm text-[#EBEBEB] max-w-[150px] sm:max-w-[200px] text-wrap">{appeal.note}</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm text-[#EBEBEB] text-wrap max-w-[100px] sm:max-w-[150px]">{appeal.address}</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm text-[#EBEBEB]">{appeal.currency}</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm text-[#EBEBEB]">
                        <div className="flex items-center gap-1 sm:gap-2">
                          {appeal.status === 'APPROVED' && (
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded-full bg-[#00B759]"></div>
                              <div className="text-[#00B759]">APPROVED</div>
                            </div>
                          )}
                          {appeal.status === 'REJECTED' && (
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded-full bg-[#FA0303]"></div>
                              <div className="text-[#FA0303]">REJECTED</div>
                            </div>
                          )}
                          {appeal.status === 'PENDING' && (
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                              <div className="text-yellow-500">PENDING</div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-4 p-3 sm:p-4">
            {appeals
              .filter((appeal) => filter === 'ALL' || appeal.status === filter)
              .map((appeal) => (
                <div
                  key={appeal.id}
                  className="bg-[#1A1D29] rounded-lg p-3 sm:p-4 border border-[#2A2D3A] cursor-pointer"
                  onClick={() => {
                    setSelectedAppeal(appeal);
                    router.push(`/dashboard/appeals/appealsDetails`);
                  }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm sm:text-base">#{appeal.id}</span>
                    <div className="flex items-center gap-1">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          appeal.status === 'APPROVED' ? 'bg-[#00B759]' : appeal.status === 'REJECTED' ? 'bg-[#FA0303]' : 'bg-yellow-500'
                        }`}
                      ></div>
                      <span
                        className={`text-xs sm:text-sm ${
                          appeal.status === 'APPROVED' ? 'text-[#00B759]' : appeal.status === 'REJECTED' ? 'text-[#FA0303]' : 'text-yellow-500'
                        }`}
                      >
                        {appeal.status}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
                    <div>
                      <p className="text-gray-400">Project</p>
                      <p className="text-wrap">{appeal.project}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Date</p>
                      <p>{appeal.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Time</p>
                      <p>{appeal.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Appeal</p>
                      <p className="text-wrap">{appeal.appeal}</p>
                      {appeal.amount && <p className="text-gray-400">{appeal.amount}</p>}
                    </div>
                    <div>
                      <p className="text-gray-400">Note</p>
                      <p className="text-wrap max-w-[90%]">{appeal.note}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Address</p>
                      <p className="text-wrap max-w-[90%]">{appeal.address}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Currency</p>
                      <p>{appeal.currency}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Floating Panel (Desktop) / Bottom Sheet (Mobile) */}
        <div
          className={`${
            selectedAppeal ? 'block' : 'hidden'
          } md:fixed md:top-4 md:right-4 md:w-[300px] sm:w-[90%] md:w-[350px] fixed bottom-0 left-0 w-full md:max-w-[400px] z-50 shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)] rounded-t-xl md:rounded-xl md:bottom-auto`}
        >
          <div className="bg-[#1A1D29] border-[#2A2D3A] rounded-t-xl md:rounded-xl h-full p-4 sm:p-6">
            <div className="flex justify-between items-center border-b border-[#2A2D3A] pb-3 sm:pb-4">
              <h2 className="text-base sm:text-lg font-medium text-[#848484]">
                {selectedAppeal.status === 'PENDING' ? 'Pending Appeal' : 'Appeal Details'}
              </h2>
              <button
                className="text-xs sm:text-sm cursor-pointer py-1 sm:py-2 px-2 sm:px-3 border border-[#848484] flex items-center gap-1 text-[#EBEBEB] rounded-lg"
                onClick={() => router.push(`/dashboard/appeals/appealsDetails`)}
              >
                View <ArrowUpRight className="h-3 sm:h-4 w-3 sm:w-4" />
              </button>
            </div>
            <div className="flex flex-col justify-center items-center py-4 sm:py-6">
              <div className="text-[#4F4AE6] text-xs sm:text-sm mb-2">Request of</div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">$20,000</div>
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-4 sm:mb-6">
                <span className="text-[#848484]">From</span>
                <span className="font-medium text-wrap">{selectedAppeal.project} Project</span>
                <span className="text-[#848484]">via</span>
                <span>BudgetChain</span>
              </div>
            </div>
            <div className="pb-3 sm:pb-4 px-3 sm:px-4">
              {selectedAppeal.status === 'PENDING' && (
                <div className="flex gap-2 sm:gap-3">
                  <button className="flex-1 border border-[#4F4AE6] py-2 sm:py-3 rounded-xl text-xs sm:text-sm text-white cursor-pointer">
                    Reject
                  </button>
                  <button className="flex-1 bg-[#4F4AE6] py-2 sm:py-3 rounded-xl text-xs sm:text-sm text-white cursor-pointer">
                    Approve
                  </button>
                </div>
              )}
              {selectedAppeal.status !== 'PENDING' && (
                <div className="mt-3 sm:mt-4">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div
                      className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                        selectedAppeal.status === 'APPROVED'
                          ? 'bg-[#00B759]/20 text-[#00B759]'
                          : 'bg-[#FA0303]/20 text-[#FA0303]'
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          selectedAppeal.status === 'APPROVED' ? 'bg-[#00B759]' : 'bg-[#FA0303]'
                        } mr-1 sm:mr-1.5`}
                      ></span>
                      {selectedAppeal.status}
                    </div>
                    <span className="text-gray-400 text-xs sm:text-sm text-wrap max-w-[150px] sm:max-w-[200px]">
                      {selectedAppeal.address}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm text-wrap max-w-[90%]">{selectedAppeal.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}