import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

interface ProgressCardProps {
  name: string;
  update?: string;
  status: string;
  timeline: string;
  timeLeft: string;
  percentage: number;
  color: string;
  border: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  name,
  update,
  status,
  timeline,
  timeLeft,
  percentage,
  color,
  border,
}) => {
  const data = [
    { name: 'Completed', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  return (
    <div
      className="w-[500px] h-[294px] rounded-lg p-4 m-2 bg-[#171720] cursor-pointer"
      style={{ borderColor: border, borderWidth: '2px' }}
    >
      <div className='flex justify-between'>
        <div className="mb-2">
          <h3 className="text-white font-medium">{name}</h3>
          {update && (
            <p className="text-xs text-gray-400">
              <span className="text-gray-300">{update}</span>
            </p>
          )}
        </div>
        {status ? (
          <p className="text-[#282828] bg-[#595959] p-1 h-fit rounded-lg">{status}</p>
        ) : (
          <div className="bg-gray-900"></div>
        )}
      </div>

      <div className="flex justify-center my-6">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <PieChart width={160} height={160}>
            <Pie
              data={data}
              cx={80}
              cy={80}
              innerRadius={60}
              outerRadius={70}
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              cornerRadius={25}
              stroke="none"
            >
              <Cell key="completed" fill={color} />
              <Cell key="remaining" fill="#171720" />
            </Pie>
          </PieChart>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl text-white font-bold">{percentage}%</span>
            <span className="text-xs text-gray-400">Completed</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <div>
          <p>Timeline: {timeline}</p>
        </div>
        <div>
          <p>Time Left: {timeLeft}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
