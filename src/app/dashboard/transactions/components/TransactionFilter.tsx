"use client"

import React from 'react';

interface TransactionFilterProps {
  value: 'ALL' | 'SUCCESSFUL' | 'CANCELED';
  onChange: (value: 'ALL' | 'SUCCESSFUL' | 'CANCELED') => void;
}

const TransactionFilter: React.FC<TransactionFilterProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as 'ALL' | 'SUCCESSFUL' | 'CANCELED')}
      className="bg-[#28283A] text-white rounded p-2"
    >
      <option value="ALL">All</option>
      <option value="SUCCESSFUL">Successful</option>
      <option value="CANCELED">Canceled</option>
    </select>
  );
};

export default TransactionFilter;
