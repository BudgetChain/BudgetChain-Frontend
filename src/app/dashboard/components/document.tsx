// ProjectDashboard.tsx
import { useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import Image from 'next/image';
import Cert from '../../../../public/svg/image 29.png';

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
  return (
    <div className="flex flex-col bg-[#171720] text-white w-full h-full rounded-md border border-gray-700 p-3">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-lg font-medium">{teamHead}</h1>
        <button className="flex items-center text-sm gap-1 border border-gray-500 rounded-md p-2 text-gray-300">
          <Download size={16} />
          <span>Download Records</span>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center mb-10">
        <div className="relative h-36 w-36">
          <div className="absolute inset-0 rounded-full bg-[#171720]"></div>

          <svg className="absolute inset-0" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#171720"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e14eca"
              strokeWidth="10"
              strokeDasharray={`${(2 * Math.PI * 45 * completionPercentage) / 100} ${2 * Math.PI * 45 * (1 - completionPercentage / 100)}`}
              strokeDashoffset={(2 * Math.PI * 45) / 4}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <span className="text-3xl font-bold">{completionPercentage}%</span>
            <span className="text-xs text-gray-400">Completed</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8 flex flex-col">
        <div>
          <span className="text-gray-400 mr-3">Name of Project:</span>
          <span>{projectName}</span>
        </div>
        <div>
          <span className="text-gray-400 mr-3">Head of Team:</span>
          <span>{teamHead}</span>
        </div>
        <div>
          <span className="text-gray-400 mr-3">Number of people in team:</span>
          <span>{teamSize}</span>
        </div>
        <div>
          <span className="text-gray-400 mr-3">Purpose of Project:</span>
          <span className="text-right">{projectPurpose}</span>
        </div>
        <div>
          <span className="text-gray-400 mr-3">Funds requested:</span>
          <span>${fundsRequested ? fundsRequested.toLocaleString() : '0'}</span>
        </div>
        <div>
          <span className="text-gray-400 mr-3">Timeline:</span>
          <span>{timelineMonths} months</span>
        </div>
        <div>
          <span className="text-gray-400 mr-3">Start date:</span>
          <span>{startDate}</span>
        </div>
        <div>
          <span className="text-gray-400 mr-3">End date:</span>
          <span>{endDate}</span>
        </div>
        <div>
          <span className="text-gray-400 mr-3">Location:</span>
          <span>{location}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-gray-400 mr-3">Uploaded Documents:</h2>
        <div className="flex gap-4 ml-56">
          {documents &&
            documents.map((doc) => (
              <div key={doc.id}>
                <div className="w-[150px] relative">
                  <Image
                    src={Cert}
                    alt={doc.title}
                    width={150}
                    height={150}
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
