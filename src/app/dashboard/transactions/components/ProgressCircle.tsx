'use client';

import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

interface ProgressCircleProps {
  progress: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
  const data = [{ value: progress }];

  return (
    <div className="w-52 h-52">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="80%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            fill="#ff00ff"
            background={{ fill: '#222' }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressCircle;
