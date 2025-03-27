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
import AppealAllocation from './AppealAllocation';
import TransactionTable from './TransactionTable';

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
      <div className="grid gap-6 p-6 md:grid-cols-3 w-full h-full">
        {[
          'Total Money Available',
          'Total Money Received',
          'Total Money Withdrawn',
        ].map((title, index) => (
          <Card
            key={index}
            className="px-6 py-10 bg-gradient-to-b from-[#894DBD] to-[#5E5EFF] text-white"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#E6E6E6]">{title}</h3>
              <div className="relative mr-4">
                <span className="pr-1 text-sm">STRK</span>{' '}
                <span className="mb-5 pb-5 absolute -bottom-[38px] text-2xl">
                  ⌄
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold mt-4">$203,500.568</p>
            <p className="text-sm mt-3">
              {title === 'Total Money Available' ? 'NATIVE MINTED $5.5K' : ''}
            </p>
          </Card>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] md:flex-row items-center w-full gap-4 md:col-span-3">
          <Card className="p-4 border border-[#EBEBEB40] bg-[#171720]">
            <h3 className="text-white py-5 px-8">A.I Analysis</h3>
            <ResponsiveContainer
              className={'bg-[#171720]'}
              width="100%"
              height={500}
            >
              <LineChart data={lineChartData}>
                <XAxis dataKey="day" tick={{ fill: 'white' }} />
                <YAxis tick={{ fill: 'white' }} />
                <Tooltip
                  wrapperStyle={{ backgroundColor: '#1E1E2E', color: 'white' }}
                />
                <Line
                  type="monotone"
                  dataKey="value1"
                  stroke="#6366F1"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="value2"
                  stroke="#EC4899"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="flex-1">
            <AppealAllocation />
          </div>
        </div>
      </div>
      <TransactionTable />
    </div>
  );
}
