'use client';
import { ArrowLeft, Download } from 'lucide-react';
import Image from 'next/image';
import Cert from '../../../../public/doc.png';
import { PieChart, Pie, Cell } from 'recharts';
import { useState, useEffect } from 'react';

interface ProjectDocument {
  id: string;
  title: string;
  imageUrl: string;
}

interface ProjectDashboardProps {
  projectName: string;
  teamHead: string;
  teamSize: number;
  projectPurpose: string;
  fundsRequested: number;
  timelineMonths: number;
  startDate: string;
  endDate: string;
  location: string;
  completionPercentage: number;
  documents: ProjectDocument[];
}

const ProjectDashboard: React.FC<ProjectDashboardProps> = ({
  projectName,
  teamHead,
  teamSize,
  projectPurpose,
  fundsRequested,
  timelineMonths,
  startDate,
  endDate,
  location,
  completionPercentage,
  documents,
}) => {
  const [chartSize, setChartSize] = useState(140);

  useEffect(() => {
    const handleResize = () => {
      setChartSize(window.innerWidth < 600 ? 100 : 140);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pieData = [
    { name: 'Completed', value: completionPercentage },
    { name: 'Remaining', value: 100 - completionPercentage },
  ];

  const COLORS = ['#e14eca', '#171720'];

  const projectDetails = [
    { label: 'Name of Project', value: projectName },
    { label: 'Head of Team', value: teamHead },
    { label: 'Number of people in team', value: teamSize },
    { label: 'Purpose of Project', value: projectPurpose },
    { label: 'Funds requested', value: `$${fundsRequested.toLocaleString()}` },
    { label: 'Timeline', value: `${timelineMonths} months` },
    { label: 'Start date', value: startDate },
    { label: 'End date', value: endDate },
    { label: 'Location', value: location },
  ];

  const handleDownload = () => {
    console.log('Downloading records...');
    // Implement download logic here
  };

  return (
    <div className="flex flex-col bg-[#171720] text-white w-full h-full rounded-md border border-gray-700 p-3">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-lg font-medium">{teamHead}</h1>
        <button onClick={handleDownload} className="flex items-center text-sm gap-1 border border-gray-500 rounded-md p-2 text-gray-300">
          <Download size={16} />
          <span>Download Records</span>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center mb-10 relative">
        <PieChart width={300} height={300}>
          <Pie
            data={pieData}
            cx={chartSize}
            cy={chartSize}
            innerRadius={chartSize - 30}
            outerRadius={chartSize - 15}
            paddingAngle={0}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            cornerRadius={25}
            stroke="none"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
          <span className="text-3xl font-bold">{completionPercentage}%</span>
          <span className="text-xs text-gray-400">Completed</span>
        </div>
      </div>

      <div className="space-y-4 mb-8 flex flex-col">
        {projectDetails.map((detail, index) => (
          <div key={index}>
            <span className="text-gray-400 mr-3">{detail.label}:</span>
            <span>{detail.value}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-gray-400 mr-3">Uploaded Documents:</h2>
        <div className="flex flex-wrap gap-4">
          {documents && documents.map((doc) => (
            <div key={doc.id} className="w-[150px] relative">
              <Image
                src={doc.imageUrl ? doc.imageUrl : Cert.src}
                alt={doc.title}
                width={150}
                height={150}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
