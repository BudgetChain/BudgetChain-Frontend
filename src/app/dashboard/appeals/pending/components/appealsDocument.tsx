'use client';

import { Download } from 'lucide-react';
import Image from 'next/image';
import Cert from '../../../../../../public/doc.png';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
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

const ProjectDashboard: React.FC<ProjectDashboardProps & { setActiveTabOne: (tab: string) => void }> = ({
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
  setActiveTabOne,
}) => {
  const [chartSize, setChartSize] = useState(120);

  useEffect(() => {
    const handleResize = () => {
      setChartSize(window.innerWidth < 600 ? 80 : window.innerWidth < 1024 ? 100 : 120);
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
    <div className="flex flex-col bg-[#171720] text-white w-full min-w-[300px] max-w-full rounded-md border border-gray-700 my-4 sm:my-6 p-4 sm:p-6 overflow-y-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
        <Image
          src="/ArrowLeft.svg"
          alt="Back to appeals"
          width={20}
          height={20}
          className="h-5 sm:h-6 w-5 sm:w-6 cursor-pointer"
          onClick={() => setActiveTabOne('appeal')}
        />
        <h1 className="text-base sm:text-lg font-medium text-center truncate">{projectName} Dao</h1>
        <button
          onClick={handleDownload}
          className="flex items-center text-xs sm:text-sm gap-1 sm:gap-2 border border-gray-500 rounded-md px-3 sm:px-4 py-2 sm:py-3 text-gray-300"
          aria-label="Download records"
        >
          <Download className="h-4 sm:h-5 w-4 sm:w-5" />
          <span>Download Records</span>
        </button>
      </div>

      <div className="flex justify-center mb-6 sm:mb-8 relative">
        <div className="w-full max-w-[240px] sm:max-w-[300px] aspect-square">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={0}
                dataKey="value"
                startAngle={200}
                endAngle={0}
                cornerRadius={25}
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold">{completionPercentage}%</span>
            <span className="text-xs sm:text-sm text-gray-400">Completed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {projectDetails.map((detail, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-xs sm:text-sm text-gray-400">{detail.label}</span>
            <span className="text-sm sm:text-base text-wrap max-w-[90%]">{detail.value}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-base sm:text-lg text-gray-400">Uploaded Documents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {documents && documents.length > 0 ? (
            documents.map((doc) => (
              <div key={doc.id} className="w-full max-w-[120px] sm:max-w-[150px] flex flex-col items-center">
                <Image
                  src={doc.imageUrl ? doc.imageUrl : Cert.src}
                  alt={doc.title}
                  width={120}
                  height={120}
                  className="w-full h-auto aspect-square object-contain rounded-md"
                />
                <p className="text-xs sm:text-sm text-wrap truncate mt-2">{doc.title}</p>
              </div>
            ))
          ) : (
            <p className="text-xs sm:text-sm text-gray-400">No documents available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;