'use client';

import MetricCard from '@/components/transaction/metricCard';
import NewTransfer from '@/components/transaction/newTransfer';
import Records from '@/components/transaction/records';
import React, { useState } from 'react';

export default function Transactions() {

  const walletAddress = "0x1234567890";
  const [activeTab, setActiveTab] = useState('Records');

  const matricCard = [
    {
      title: 'Total Transactions',
      value: 29,
    },
    {
      title: 'Total Canceled',
      value: 7,
    },
    {
      title: 'Total Successful',
      value: '$20,000',
    },
  ];

  return (
    <section className="  bg-[#171720] overflow-x-hidden h-full pl-3">
      {/* Metric Cards */}
      <div className="grid grid-cols-12 gap-[30px] pl-3 sm:px-10 md:px-0 w-full">
        {matricCard.map((card, index) => (
          <MetricCard key={index} title={card.title} value={card.value} />
        ))}
      </div>

      {/* Tabbed Navigation */}
      <div>
        <div className="flex justify-start gap-[18px] pt-[7px] px-[16px]  mt-10 mb-5 w-full sm:w-2/3 md:w-1/3 text-[#848484] text-[14px]">
          <button
            className={`${activeTab === 'Records' ? 'text-white' : ''}`}
            onClick={() => setActiveTab('Records')}
          >
            Records
          </button>
          <button
            className={`${activeTab === 'New Transfer' ? 'text-white' : ''} `}
            onClick={() => setActiveTab('New Transfer')}
          >
            New Transfer
          </button>
        </div>
        <div className='flex justify-start  w-full sm:w-2/3 md:w-1/3 bg-[#848484] p-[0.5px] relative'>
        <div className={` ${activeTab === 'Records' ? "bg-[#4F4AE6]" : ""}  h-[1px] w-[80px]`}> </div>
        <div className={` ${activeTab === 'New Transfer' ? "bg-[#4F4AE6]" : ""}  h-[1px] w-[85px]`}> </div>
        </div>
      </div>

      {/* Content Based on Active Tab */}
      <div className=" w-full">
        {activeTab === 'Records' && <Records />}
        {activeTab === 'New Transfer' && (
          <NewTransfer onBack={() => setActiveTab('Records')} walletAddress={walletAddress} />
        )}
      </div>
    </section>
  );
}
