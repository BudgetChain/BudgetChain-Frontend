import React from 'react';

interface ProgressCardProps {
  name: string;
  lead?: string;
  timeline: string;
  timeLeft: string;
  percentage: number;
  color: string;
  border: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  name,
  lead,
  timeline,
  timeLeft,
  percentage,
  color,
  border,
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * percentage) / 100;

  return (
    <div
      className="w-[500px] h-[250px] rounded-lg p-4 bg-[#171720] cursor-pointer"
      style={{ borderColor: border, borderWidth: '2px' }}
    >
      <div className="mb-2">
        <h3 className="text-white font-medium">{name}</h3>
        {lead && (
          <p className="text-xs text-gray-400">
            Lead: <span className="text-gray-300">{lead}</span>
          </p>
        )}
      </div>

      <div className="flex justify-center my-6">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            className="transform -rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#171720"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke={color}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl text-white font-bold">{percentage}%</span>
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
