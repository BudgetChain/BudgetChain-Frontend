"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function TransactionTable() {
  // State for filter options
  const [selectedProject, setSelectedProject] = useState('All Projects');
  const [selectedDate, setSelectedDate] = useState('All Dates');
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  // Sample transaction data
  const transactions = [
    { id: 1, project: "Fragma", dropdown:'One’s Project ', currency: "STRK", amount: "20,000 STRK", usdAmount: "$10,200", address: "OxcK4R...7G4F", note: "Gorem ipsum dolor sit amet, consectetur...", date: "18/02/2025", time: "8:00 PM UTC", status: "SUCCESSFUL" },
    { id: 2, project: "Fragma",dropdown:'One’s Project ', currency: "STRK", amount: "20,000 STRK", usdAmount: "$10,200", address: "OxcK4R...7G4F", note: "Gorem ipsum dolor sit amet, consectetur...", date: "18/02/2025", time: "8:00 PM UTC", status: "CANCELED" },
    { id: 3, project: "Ndida",dropdown:' Colab’s Project', currency: "STRK", amount: "2,000 STRK", usdAmount: "$1,200", address: "OxcK4R...7G4F", note: "Gorem ipsum dolor sit amet, consectetur...", date: "18/02/2025", time: "8:00 PM UTC", status: "SUCCESSFUL" },
    { id: 4, project: "Fragma",dropdown:'BlueBridge’s Project ', currency: "USDC", amount: "", usdAmount: "$1,200", address: "OxcK4R...7G4F", note: "Gorem ipsum dolor sit amet, consectetur...", date: "18/02/2025", time: "8:00 PM UTC", status: "SUCCESSFUL" },
    { id: 5, project: "Ndida",dropdown:'Colab’s Project ', currency: "Fiat", amount: "", usdAmount: "$1,200", address: "01124*****", note: "Gorem ipsum dolor sit amet, consectetur...", date: "18/02/2025", time: "8:00 PM UTC", status: "SUCCESSFUL" },
    { id: 6, project: "Steloz",dropdown:'Scar’s Project ', currency: "STRK", amount: "2,000 STRK", usdAmount: "$1,200", address: "OxcK4R...7G4F", note: "Gorem ipsum dolor sit amet, consectetur...", date: "18/02/2025", time: "8:00 PM UTC", status: "CANCELED" },
    { id: 7, project: "Ndida",dropdown:'Colab’s Project ', currency: "Fiat", amount: "", usdAmount: "$1,200", address: "03465*****", note: "Gorem ipsum dolor sit amet, consectetur...", date: "18/02/2025", time: "8:00 PM UTC", status: "SUCCESSFUL" },
    { id: 8, project: "Fragma",dropdown:'One’s Project  ', currency: "USDC", amount: "", usdAmount: "$1,200", address: "OxcK4R...7G4F", note: "Gorem ipsum dolor sit amet, consectetur...", date: "18/02/2025", time: "8:00 PM UTC", status: "SUCCESSFUL" },
    { id: 9, project: "Fragma",dropdown:'One’s Project  ', currency: "STRK", amount: "", usdAmount: "$1,200", address: "OxcK4R...7G4F", note: "Gorem ipsum dolor sit amet, consectetur...", date: "18/02/2025", time: "8:00 PM UTC", status: "SUCCESSFUL" },
    { id: 10, project: "Ndida",dropdown:'Colab’s Project ', currency: "STRK", amount: "2,000 STRK", usdAmount: "$1,200", address: "OxcK4R...7G4F", note: "Gorem ipsum dolor sit amet, consectetur...", date: "18/02/2025", time: "8:00 PM UTC", status: "SUCCESSFUL" },
    { id: 11, project: "Ndida",dropdown:'Colab’s Project ', currency: "USDC", amount: "", usdAmount: "$1,200", address: "OxcK4R...7G4F", note: "Gorem ipsum dolor sit amet, consectetur...", date: "18/02/2025", time: "8:00 PM UTC", status: "SUCCESSFUL" },
    { id: 12, project: "Ndida",dropdown:'Colab’s Project ', currency: "USDC", amount: "", usdAmount: "$1,200", address: "OxcK4R...7G4F", note: "Gorem ipsum dolor sit amet, consectetur...", date: "18/02/2025", time: "8:00 PM UTC", status: "CANCELED" },
    { id: 13, project: "Ndida",dropdown:'Colab’s Project ', currency: "STRK", amount: "", usdAmount: "$1,200", address: "OxcK4R...7G4F", note: "Gorem ipsum dolor sit amet, consectetur...", date: "18/02/2025", time: "8:00 PM UTC", status: "SUCCESSFUL" },
  ];

  // Filter transactions based on selected project and date
  const filteredTransactions = transactions.filter((tx) => {
    const matchesProject =
      selectedProject === 'All Projects' || tx.dropdown.trim() === selectedProject;
    const matchesDate =
      selectedDate === 'All Dates' || tx.date === selectedDate;
    return matchesProject && matchesDate;
  });

  // Unique projects and dates for dropdown options
  const projects = ['All Projects', ...new Set(transactions.map((tx) => tx.dropdown.trim()))];
  const dates = ['Added Dates', ...new Set(transactions.map((tx) => tx.date))];

  return (
    <div>
      <div className="text-gray-400 mt-6 rounded-lg p-4 border-gray-800">
        <div className="flex justify-between gap-6 md:flex-row flex-col md:items-center mb-4">
          <div className="flex items-center space-x-5">
            <h2 className="font-bold">All Transactions</h2>
            {/* Project Filter Dropdown */}
            <div className="relative">
              <button
                className="flex items-center border border-gray-700 rounded px-2 py-1 text-sm"
                onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
              >
                {selectedProject} <ChevronDown size={14} className="ml-1" />
              </button>
              {isProjectDropdownOpen && (
                <div className="absolute mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                  {projects.map((dropdown) => (
                    <button
                      key={dropdown}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                      onClick={() => {
                        setSelectedProject(dropdown);
                        setIsProjectDropdownOpen(false);
                      }}
                    >
                      {dropdown}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Date Filter Dropdown */}
          <div className="flex items-center space-x-2 text-sm">
            <span>Filter by:</span>
            <div className="relative">
              <button
                className="flex items-center border border-gray-700 rounded px-2 py-1"
                onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              >
                {selectedDate} <ChevronDown size={14} className="ml-1" />
              </button>
              {isDateDropdownOpen && (
                <div className="absolute mt-2 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                  {dates.map((date) => (
                    <button
                      key={date}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                      onClick={() => {
                        setSelectedDate(date);
                        setIsDateDropdownOpen(false);
                      }}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto text-sm">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-2 pl-2">S/N</th>
                <th className="pb-2">Projects</th>
                <th className="pb-2">Currency</th>
                <th className="pb-2">Amount Sent</th>
                <th className="pb-2">Address/Account</th>
                <th className="pb-2">Note</th>
                <th className="pb-2">Date/Time</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="py-3 pl-2">{tx.id}.</td>
                  <td className="py-3">{tx.project}</td>
                  <td className="py-3">{tx.currency}</td>
                  <td className="py-3">
                    {tx.amount && <div>{tx.amount}</div>}
                    <div>{tx.usdAmount}</div>
                  </td>
                  <td className="py-3">{tx.address}</td>
                  <td className="py-3 text-gray-400">{tx.note}</td>
                  <td className="py-3">
                    <div>{tx.date}</div>
                    <div className="text-gray-400 text-sm">{tx.time}</div>
                  </td>
                  <td className="py-3">
                    {tx.status === 'SUCCESSFUL' ? (
                      <span className="flex items-center text-green-500">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        SUCCESSFUL
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        CANCELED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}