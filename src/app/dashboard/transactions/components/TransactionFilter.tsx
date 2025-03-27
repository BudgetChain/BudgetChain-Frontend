'use client';

import { useState } from 'react';

const TransactionFilter = () => {
  const [sortBy, setSortBy] = useState('Date Added');

  return (
    <div>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-gray-900 text-gray-300 border border-[#42415B] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <option value="Date Added">Date Added</option>
        <option value="Amount">Amount</option>
        <option value="Status">Status</option>
      </select>
    </div>
  );
};

export default TransactionFilter;