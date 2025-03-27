'use client';

import { useState } from 'react';
import TransactionsTable from './table';

type Transaction = {
  'S/N': number;
  Currency: string;
  Address: string;
  'Amount Requested': string[];
  Note: string;
  Date: string;
  Time: string;
  Status: string;
};

export default function Records() {
  const transactions: Transaction[] = [
    {
      'S/N': 1,
      Currency: 'STRK',
      Address: '0xcK4R....7G4F',
      'Amount Requested': ['20,000 STRK', '$10,200'],
      Note: 'Lorem ipsum dolor sit amet, consectetur....',
      Date: '12-12-24',
      Time: '5:34 UTC',
      Status: 'SUCCESSFUL',
    },
    {
      'S/N': 2,
      Currency: 'STRK',
      Address: '0xcK4R....7G4F',
      'Amount Requested': ['20,000 STRK', '$10,200'],
      Note: 'Lorem ipsum dolor sit amet, consectetur....',
      Date: '12-12-24',
      Time: '5:34 UTC',
      Status: 'CANCELED',
    },
    {
      'S/N': 3,
      Currency: 'STRK',
      Address: '0xcK4R....7G4F',
      'Amount Requested': ['2,000 STRK', '$1,200'],
      Note: 'Lorem ipsum dolor sit amet, consectetur....',
      Date: '12-12-24',
      Time: '5:34 UTC',
      Status: 'SUCCESSFUL',
    },
    {
      'S/N': 4,
      Currency: 'STRK',
      Address: '0xcK4R....7G4F',
      'Amount Requested': ['2,000 STRK', '$1,200'],
      Note: 'Lorem ipsum dolor sit amet, consectetur....',
      Date: '12-12-24',
      Time: '5:34 UTC',
      Status: 'SUCCESSFUL',
    },
    {
      'S/N': 5,
      Currency: 'USDC',
      Address: '0xcK4R....7G4F',
      'Amount Requested': ['$1,200', '$1,200'],
      Note: 'Lorem ipsum dolor sit amet, consectetur....',
      Date: '12-12-24',
      Time: '5:34 UTC',
      Status: 'SUCCESSFUL',
    },
    {
      'S/N': 6,
      Currency: 'STRK',
      Address: '0xcK4R....7G4F',
      'Amount Requested': ['2,000 STRK', '$1,200'],
      Note: 'Lorem ipsum dolor sit amet, consectetur....',
      Date: '12-12-24',
      Time: '5:34 UTC',
      Status: 'CANCELED',
    },
    {
      'S/N': 7,
      Currency: 'USDC',
      Address: '0xcK4R....7G4F',
      'Amount Requested': ['$1,200', '$1,200'],
      Note: 'Lorem ipsum dolor sit amet, consectetur....',
      Date: '12-12-24',
      Time: '5:34 UTC',
      Status: 'SUCCESSFUL',
    },
    {
      'S/N': 8,
      Currency: 'STRK',
      Address: '0xcK4R....7G4F',
      'Amount Requested': ['2,000 STRK', '$1,200'],
      Note: 'Lorem ipsum dolor sit amet, consectetur....',
      Date: '12-12-24',
      Time: '5:34 UTC',
      Status: 'SUCCESSFUL',
    },
    {
      'S/N': 9,
      Currency: 'Fiat',
      Address: '00234*****',
      'Amount Requested': ['$1,200', '$1,200'],
      Note: 'Lorem ipsum dolor sit amet, consectetur....',
      Date: '12-12-24',
      Time: '5:34 UTC',
      Status: 'SUCCESSFUL',
    },
    {
      'S/N': 10,
      Currency: 'STRK',
      Address: '00xcK4R....7G4F',
      'Amount Requested': ['2,000 STRK', '$1,200'],
      Note: 'Lorem ipsum dolor sit amet, consectetur....',
      Date: '12-12-24',
      Time: '5:34 UTC',
      Status: 'SUCCESSFUL',
    },
    {
      'S/N': 11,
      Currency: 'STRK',
      Address: '0xcK4R....7G4F',
      'Amount Requested': ['2,000 STRK', '$1,200'],
      Note: 'Lorem ipsum dolor sit amet, consectetur....',
      Date: '12-12-24',
      Time: '5:34 UTC',
      Status: 'SUCCESSFUL',
    },
  ];
 
  const [filter, setFilter] = useState('date');



  // Sort transactions by date (if needed)
  const sortedTransactions = [...transactions].sort((a, b) => {
    switch (filter) {
      case 'date':
        return Date.parse(b.Date) - Date.parse(a.Date);
      case 'currency':
        return a.Currency.localeCompare(b.Currency);
      case 'amount':
        const amountA = parseFloat(a['Amount Requested'][1].replace(/[$,]/g, ''));
        const amountB = parseFloat(b['Amount Requested'][1].replace(/[$,]/g, ''));
        return amountB - amountA;
      case 'status':
        if (a.Status === 'SUCCESSFUL' && b.Status === 'CANCELED') return -1;
        if (a.Status === 'CANCELED' && b.Status === 'SUCCESSFUL') return 1;
        return 0;
      case 'sn':
        return a['S/N'] - b['S/N'];
      default:
        return 0;
    }
  });

  return (
    <section className="shadow-[0px_0px_4px_0px_#EBEBEB40] w-full p-3 rounded-[12px]">
      {/* Header and Filter */}
      <div className="w-full h-[67px] flex justify-between items-center md:px-[30px]">
        <h2 className="text-[14px] text-[#EBEBEB]  font-bold">
          Ndida’s Project’s Transactions
        </h2>
        <div className="bg-transparent flex gap-2 font-light">
          <label
            className="font-[300] text-[14px] flex flex-none" 
            htmlFor="filter"
          >
            Filter by:
          </label>
          <select
            className="bg-transparent text-[12px] outline-none text-[#848484] font-[400] border-0.2px rounded-[8px] border-[#42415B]"
            name="filter"
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="date">Date Added</option>
            <option value="currency">Currency</option>
            <option value="amount">Amount Requested</option>
            <option value="status">Status</option>
            <option value="sn">Serial Number</option>
          </select>
        </div>
      </div>

      {/* Transaction Table */}
      <div
        className="w-full overflow-x-scroll  [&::-webkit-scrollbar]:hidden [&]:scrollbar-none" >
       <TransactionsTable transactions={transactions} sortedTransactions={sortedTransactions}/>
      </div>
    </section>
  );
}
