'use client';

import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell } from 'recharts';

const pieChartData = [
  { name: 'Fragma Project', value: 17000, color: '#6366F1', price: '$17,000' },
  { name: 'Ndida Project', value: 20000, color: '#EC4899', price: '$20,000' },
];

export default function AppealAllocation() {
  return (
    <div className="bg-[#0F0F1A]  rounded-lg space-y-6">
      {/* Pending Appeal Section */}
      <div className="text-center border p-5 rounded-xl border-[#EBEBEB40]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#848484] text-lg font-semibold">
            Pending Appeal
          </h2>
          <a
            href="#"
            className="text-[#EBEBEB] border rounded p-1 border-[#848484] hover:text-indigo-300 flex items-center"
          >
            View
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="ml-1"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        </div>
        <div className="text-sm text-[#4F4AE6] mb-2">Request of</div>
        <div className="text-2xl font-bold text-white mb-2">$20,000</div>
        <div className="text-sm text-[#848484] my-7">
          From <span className="text-[#EBEBEB]">Ndida Project</span> via
          <span className="text-[#EBEBEB]">BudgetChain</span>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="w-full bg-transparent border border-[#4F4AE6] hover:border-[#EBEBEB40] text-white hover:bg-[#4F4AE6]"
          >
            Reject
          </Button>
          <Button className="w-full bg-[#4F4AE6] text-white hover:bg-indigo-700">
            Approve
          </Button>
        </div>
      </div>

      {/* Projects Funds Allocation Section */}
      <div className="text-center border p-5 rounded-xl border-[#EBEBEB40]">
        <h2 className="text-[#848484] text-left text-lg font-semibold mb-4">
          Projects Funds Allocation
        </h2>

        <div className="flex justify-between w-full">
          <div className="relative  justify-center">
            <div className="w-48 h-48">
              <PieChart width={192} height={192}>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
          <div className=" flex flex-col justify-end items-center space-x-3 m-4">
            {pieChartData.map((entry, index) => (
              <div key={index} className="">
                <div className="flex items-center justify-center space-y-4">
                  <div
                    className="w-3 h-3 mt-3.5 rounded-full mr-2"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-white">{entry.name}</span>
                </div>

                <p className="text-[#EBEBEB]">{entry.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
