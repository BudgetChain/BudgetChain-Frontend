import React from 'react';

interface MetricCardProps {
  title: string;
  value: number | string;
}

export default function MetricCard({title, value}: MetricCardProps) {
  return (
    <div className="w-[352px] h-[160px] rounded-[16px] bg-gradient-to-b from-[#894DBD] px-5 to-[#5E5EFF] flex flex-col  justify-center">
     
      <div className="flex justify-between w-full font-light">
        <h5>{title}</h5>
        <select
          className="bg-transparent outline-none border-none"
          name=""
          id=""
        >
          <option value="Total Transactions">All</option>
        </select>
      </div>

      <div>
        <h2 className='text-[24px] font-bold'>
           {value}
        </h2>
      </div>
    </div>
  );
}
