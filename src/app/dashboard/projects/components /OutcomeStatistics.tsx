import React from 'react';
import ProgressBar from './ProgressBar';

const OutcomeStatistics = () => {
  return (
    <div className="bg-[#171720] p-8 rounded-xl shadow-md text-white w-full max-w-2xl border-2 border-[#EBEBEB40]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Outcome Statistics</h2>
        <button className="text-gray-400 hover:text-white">⋮</button>
      </div>
      <ProgressBar key={'icon1'} label="STRK" value={75} color="#a100ff" />
      <ProgressBar key={'icon2'} label="USDC" value={33} color="#0044ff" />
      <ProgressBar key={'icon3'} label="Fiat" value={16} color="#ff6600" />
    </div>
  );
};

export default OutcomeStatistics;
