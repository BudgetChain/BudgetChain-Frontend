import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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
      className="w-full min-h-[200px] sm:min-h-[250px] rounded-lg p-4 sm:p-6 bg-[#171720] cursor-pointer"
      style={{ borderColor: border, borderWidth: '2px' }}
    >
      <div className="flex justify-between items-center">
        <div className="mb-2">
          <h3 className="text-sm sm:text-base font-medium text-white truncate">
            {name}
          </h3>
          {update && (
            <p className="text-xs sm:text-sm text-gray-400">
              <span className="text-gray-300">{update}</span>
            </p>
          )}
        </div>
        {status ? (
          <p className="text-xs sm:text-sm text-[#282828] bg-[#595959] px-2 py-1 rounded-lg whitespace-nowrap">
            {status}
          </p>
        ) : (
          <div className="bg-gray-900"></div>
        )}
      </div>

      <div className="flex justify-center my-4 sm:my-6">
        <div className="relative w-full max-w-[160px] aspect-square flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
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
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              {percentage}%
            </span>
            <span className="text-xs sm:text-sm text-gray-400">Completed</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-xs sm:text-sm text-gray-400 mt-2 sm:mt-4">
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