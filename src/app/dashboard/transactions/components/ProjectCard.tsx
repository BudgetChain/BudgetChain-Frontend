'use client';

import React from 'react';

import ProgressCircle from './ProgressCircle';

const ProjectCard = () => {
  return (
    <div className="bg-[#171720] p-8 rounded-xl shadow-md text-white w-full max-w-2xl border-2 border-[#EBEBEB40]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Ndida Project</h2>
        <button className="text-gray-400 hover:text-white">⋮</button>
      </div>
      <div className="flex justify-between items-center gap-4">
        <ProgressCircle progress={80} />

        <ul className="text-sm sm:text-base text-[#EBEBEB]">
          <li>• 80% Ready for Publishing</li>
          <li>• 17 Successful Transactions</li>
          <li>• 3 Canceled Transactions</li>
          <li>• 5 Appeals</li>
          <li>• 4 Weeks remaining time.</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectCard;
