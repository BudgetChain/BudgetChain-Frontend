'use client';

import React from 'react';

interface ProgressBarProps {
  label: string;
  value: number | string;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, color }) => {
  return (
    <div className="flex flex-col mt-6">
      <div className="flex justify-between items-center text-gray-300 text-sm mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
