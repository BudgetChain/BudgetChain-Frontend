'use client';

import { useState } from 'react';

const TransactionFilter = () => {
  const [sortBy, setSortBy] = useState('Date Added');

  return (
    <div>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-[#171720] text-[#747479] border border-[#747479] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <option value="Date Added">Date Added</option>
        <option value="Amount">Amount</option>
        <option value="Status">Status</option>
      </select>
    </div>
  );
};

export default TransactionFilter;