'use client';

import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import dynamic from 'next/dynamic';
const AppealAllocation = dynamic(() => import('./AppealAllocation'), {
  ssr: false,
});
const TransactionTable = dynamic(() => import('./TransactionTable'), {
  ssr: false,
});

const lineChartData = [
  { day: 2, value1: 1000, value2: 500 },
  { day: 6, value1: 800, value2: 900 },
  { day: 10, value1: 600, value2: 1100 },
  { day: 14, value1: 1000, value2: 700 },
  { day: 18, value1: 950, value2: 1200 },
  { day: 22, value1: 980, value2: 850 },
  { day: 26, value1: 948, value2: 1000 },
  { day: 30, value1: 700, value2: 800 },
];

export default function Dashboard() {
  return (
    <div>
      <div className="grid gap-4 p-4 sm:p-6 md:grid-cols-3 w-full h-full ">
        {[
          'Total Money Available',
          'Total Money Received',
          'Total Money Withdrawn',
        ].map((title, index) => (
          <Card
            key={index}
            className="px-3 py-4 sm:px-6 sm:py-8 lg:py-10 bg-gradient-to-b from-[#894DBD] to-[#5E5EFF] text-white w-full min-h-[140px] sm:min-h-[160px] flex flex-col justify-between"
          >
            {/* Header Section */}
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <h3 className="text-xs sm:text-base lg:text-lg font-semibold text-[#E6E6E6] leading-tight pr-1 flex-1 min-w-0">
                <span className="block sm:hidden text-xs leading-4">
                  {title.split(' ').slice(0, 2).join(' ')}
                  <br />
                  {title.split(' ').slice(2).join(' ')}
                </span>
                <span className="hidden sm:block">{title}</span>
              </h3>
              <div className="flex-shrink-0 text-right">
                <span className="text-xs sm:text-sm text-[#E6E6E6]">STRK</span>
                <div className="text-lg sm:text-xl text-[#E6E6E6] opacity-70 leading-none">
                  ⌄
                </div>
              </div>
            </div>

            {/* Amount Section */}
            <div className="flex-1 flex flex-col justify-end">
              <p className="text-lg sm:text-2xl lg:text-3xl font-bold leading-tight mb-1 sm:mb-2 break-all sm:break-normal">
                $203,500.568
              </p>
              {title === 'Total Money Available' && (
                <p className="text-xs sm:text-sm opacity-80 leading-tight">
                  NATIVE MINTED $5.5K
                </p>
              )}
            </div>
          </Card>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] md:flex-row items-stretch w-full gap-4 md:col-span-3">
          
          <Card className="p-3 sm:p-4 md:p-6 border border-[#EBEBEB40] bg-[#171720] w-full">
            <h3 className="text-white py-2 sm:py-3 md:py-5 px-2 sm:px-4 md:px-8 text-sm sm:text-base md:text-lg font-semibold">
              A.I Analysis
            </h3>
            <div className="h-[200px] sm:h-[280px] md:h-[350px] lg:h-[400px] xl:h-[450px] px-1 sm:px-2">
              <ResponsiveContainer
                className={'bg-[#171720]'}
                width="100%"
                height="100%"
              >
                <LineChart
                  data={lineChartData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 5,
                    bottom: 10,
                  }}
                >
                  <XAxis
                    dataKey="day"
                    tick={{
                      fill: 'white',
                      fontSize: window.innerWidth < 640 ? 10 : 12,
                    }}
                    axisLine={{ stroke: '#374151' }}
                    tickLine={{ stroke: '#374151' }}
                    tickMargin={8}
                  />
                  <YAxis
                    tick={{
                      fill: 'white',
                      fontSize: window.innerWidth < 640 ? 10 : 12,
                    }}
                    axisLine={{ stroke: '#374151' }}
                    tickLine={{ stroke: '#374151' }}
                    tickMargin={5}
                    width={window.innerWidth < 640 ? 35 : 45}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E1E2E',
                      color: 'white',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      fontSize: window.innerWidth < 640 ? '12px' : '14px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value1"
                    stroke="#6366F1"
                    strokeWidth={window.innerWidth < 640 ? 2 : 3}
                    dot={false}
                    activeDot={{
                      r: window.innerWidth < 640 ? 3 : 4,
                      fill: '#6366F1',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value2"
                    stroke="#B1BBE4"
                    strokeWidth={window.innerWidth < 640 ? 2 : 3}
                    dot={false}
                    activeDot={{
                      r: window.innerWidth < 640 ? 3 : 4,
                      fill: '#B1BBE4',
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="w-full">
            <AppealAllocation />
          </div>
        </div>
      </div>
      <TransactionTable />
    </div>
  );
}
