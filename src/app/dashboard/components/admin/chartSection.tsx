import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ExternalLink } from 'lucide-react';

interface RevenueData {
  week: string;
  value1: number; // Purple area (e.g., Revenue)
  value2: number; // Orange/Pink area (e.g., Expenses)
}

const revenueData: RevenueData[] = [
  { week: 'WK1', value1: 1000, value2: 700 },
  { week: 'WK2', value1: 1200, value2: 800 },
  { week: 'WK3', value1: 900, value2: 600 },
  { week: 'WK4', value1: 1500, value2: 1000 },
  { week: 'WK5', value1: 1300, value2: 900 },
  { week: 'WK6', value1: 1800, value2: 1200 },
  { week: 'WK7', value1: 1600, value2: 1100 },
  { week: 'WK8', value1: 1400, value2: 950 },
  { week: 'WK9', value1: 1700, value2: 1300 },
  { week: 'WK10', value1: 1900, value2: 1400 },
  { week: 'WK11', value1: 2000, value2: 1500 },
  { week: 'WK12', value1: 2200, value2: 1600 },
];

// Custom Tooltip Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // Access the data point
    return (
      <div className="bg-gray-800 text-white p-2 rounded-lg shadow-lg">
        <p className="font-bold">{`Week: ${data.week}`}</p>
        <p>{`Revenue: $${data.value1}`}</p>
        <p>{`Expenses: $${data.value2}`}</p>
      </div>
    );
  }
  return null;
};

const AIChat = () => {
  return (
    <div className="rounded-lg p-4 border md:flex space-y-4 gap-6 mt-6 border-gray-800">
      {/* Revenue Chart */}
      <div className="bg-[#111C44] rounded-xl p-6 w-[100%] flex flex-col justify-center">
        <h3 className="text-white text-lg mb-4">Revenue Chart</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                {/* Purple Gradient */}
                <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4318FF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4318FF" stopOpacity={0} />
                </linearGradient>
                {/* Orange/Pink Gradient */}
                <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D946EF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#D946EF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1B2559" />
              <XAxis dataKey="week" stroke="#fff" />
              <YAxis stroke="#fff" domain={[200, 2200]} />
              <Tooltip content={<CustomTooltip />} />
              {/* Purple Area (Revenue) */}
              <Area
                type="monotone"
                dataKey="value1"
                stroke="#4318FF"
                fillOpacity={1}
                fill="url(#colorValue1)"
              />
              {/* Orange/Pink Area (Expenses) */}
              <Area
                type="monotone"
                dataKey="value2"
                stroke="#D946EF"
                fillOpacity={1}
                fill="url(#colorValue2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pending Appeal and Projects Funds Allocation */}
      <div className="space-y-4 md:w-[60%]">
        {/* Pending Appeal */}
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm text-gray-500">Pending Appeal</h2>
            <button className="flex items-center text-indigo-400 text-sm">
              View <ExternalLink size={14} className="ml-1" />
            </button>
          </div>

          <div className="text-indigo-400 text-center text-sm mb-1">Request of</div>
          <div className="text-2xl text-white text-center font-bold mb-2">$20,000</div>

          <div className="text-sm text-gray-400 mb-4 text-center">
            From <span className="text-white">Ndida Project</span> via BudgetChain
          </div>

          <div className="flex gap-2">
            <button className="flex-1 border border-indigo-600 text-white py-2 rounded-lg">Reject</button>
            <button className="flex-1 bg-indigo-600 py-2 text-white rounded-lg">Approve</button>
          </div>
        </div>

        {/* Projects Funds Allocation */}
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <h2 className="font-bold mb-4 pl-14 text-gray-400">Projects Funds Allocation</h2>

          <div className="flex justify-center">
            <div className="flex gap-3">
              {/* SVG Doughnut Chart */}
              <svg viewBox="0 0 100 100" className="w-[160px] h-[160px]">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#4338CA" strokeWidth="15" strokeDasharray="188.5 251.3" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#D946EF" strokeWidth="15" strokeDasharray="62.8 377" strokeDashoffset="-188.5" />
              </svg>

              {/* Legend */}
              <div className="mt-6">
                <div className="flex items-center justify-center mt-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 mt-1 rounded-full bg-indigo-600"></div>
                    <div className="text-sm">
                      <div className="text-gray-200">Fragma Project</div>
                      <div className="text-gray-400">$17,000</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 mt-1 rounded-full bg-fuchsia-500"></div>
                    <div className="text-sm">
                      <div className="text-gray-200">Ndida Project</div>
                      <div className="text-gray-400">$20,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;