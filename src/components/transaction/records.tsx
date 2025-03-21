"use client"

import { useState } from "react";


export default function Records() {
  
  
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
      Address:
        '00xcK4R....7G4F',
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
  // Shorten Address
  const [filter, setFilter] = useState('date');

  // Shorten Address
  const shortenAddress = (address: string): string => {
    if (!address || address.length < 10) return address;
    return `${address.slice(0, 6)}....${address.slice(-4)}`;
  };

  // Truncate Note
  const truncateNote = (note: string): string => {
    const maxLength = 50;
    return note.length > maxLength ? `${note.substring(0, maxLength)}...` : note;
  };

  // Sort transactions by date (if needed)
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (filter === 'date') {
      return new Date(a.Date).getTime() - new Date(b.Date).getTime();
    }
    return 0;
  });

  return (
    <section className="shadow-[0px_0px_4px_0px_#EBEBEB40] rounded-[12px]">
      {/* Header and Filter */}
      <div className="w-full h-[67px] flex justify-between items-center px-[30px]">
        <h2 className="text-[14px] text-[#EBEBEB] font-bold">
          Ndida’s Project’s Transactions
        </h2>
        <div className="bg-transparent flex gap-2 font-light">
          <label className="font-[300] text-[14px]" htmlFor="filter">
            Filter by:
          </label>
          <select
            className="bg-transparent text-[12px] text-[#848484] font-[400] border-0.2px rounded-[8px] border-[#42415B]"
            name="filter"
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="date">Date Added</option>
          </select>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="w-full">
        <table className="w-full text-[14px] text-[#848484]">
          <thead className="text-[#EBEBEB] text-[14px] h-[45px] bg-[#2B2B46]">
            <tr className="text-start">
              {transactions.length > 0 &&
                Object.keys(transactions[0]).map((key, index) => (
                  <th
                    key={index}
                    className="text-start font-light max-w-[174px] pl-[20px]"
                  >
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="overflow-y-scroll h-[600px]">
            {sortedTransactions.map((transaction, index) => (
              <tr
                key={index}
                className="border-b-[0.2px] border-[#42415B] h-[50px]"
              >
                {Object.entries(transaction).map(([key, value], index) => (
                  <td
                    key={index}
                    className={`text-start truncate font-thin max-w-[174px] pl-[20px] text-[14px] 
                      ${key === 'Note' ? 'italic' : ''}  
                      ${key === 'Status' && value === 'SUCCESSFUL' ? 'text-[#00B759]' : ''} 
                      ${key === 'Status' && value === 'CANCELED' ? 'text-[#E20008]' : ''}`}
                  >
                    {Array.isArray(value) ? (
                      <div className="flex flex-col">
                        {value.map((item, idx) => (
                          <span className="text-[#848484]" key={idx}>
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : key === 'Address' ? (
                      typeof value === 'string' ? shortenAddress(value) : value
                    ) : key === 'Note' ? (
                      typeof value === 'string' ? truncateNote(value) : value
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}