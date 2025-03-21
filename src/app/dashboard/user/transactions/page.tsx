"use client"


import MetricCard from '@/components/transaction/metricCard';
import NewTransfer from '@/components/transaction/newTransfer';
import Records from '@/components/transaction/records';
import React, { useState } from 'react';

export default function Transactions() {
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
    <section className="p-8 bg-[#171720] h-full">
      {/* Metric Cards */}
      <div className="flex justify-between gap-[22px]">
        {matricCard.map((card, index) => (
          <MetricCard key={index} title={card.title} value={card.value} />
        ))}
      </div>

      {/* Tabbed Navigation */}
      <div className="flex justify-start gap-[18px] py-[7px] px-[16px] border-b border-[#EBEBEB] mt-10 mb-5 w-1/3 text-[#848484] text-[14px]">
        <button
          className={`${activeTab === 'Records' ? 'text-white' : ''}`}
          onClick={() => setActiveTab('Records')}
        >
          Records
        </button>
        <button
          className={`${activeTab === 'New Transfer' ? 'text-white' : ''}`}
          onClick={() => setActiveTab('New Transfer')}
        >
          New Transfer
        </button>
      </div>

      {/* Content Based on Active Tab */}
      <div className="">
        {activeTab === 'Records' && <Records />}
        {activeTab === 'New Transfer' && <NewTransfer />}
      </div>
    </section>
  );
}