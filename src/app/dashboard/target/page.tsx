'use client';
import { useState } from 'react';
import { NextPage } from 'next';
import ProgressCard from '../components/progressCard';
import Records from '../records/page';

const Target: NextPage = () => {
  const [showRecords, setShowRecords] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    if (index === 0) {
      setShowRecords(true);
      setSelectedProject(0);
    } else {
      setShowRecords(false);
      setSelectedProject(null);
    }
  };

  const defaultProjects = [
    {
      name: 'Nibiru Project',
      lead: 'John Adams & Mark Johnson',
      timeline: '2 Months',
      timeLeft: '5 Days',
      percentage: 80,
      color: '#be48ed',
      border: '#be48ed',
    },
    {
      name: 'Pragma Project',
      lead: 'Alice Chen & Bob Thomas',
      timeline: '3 Months',
      timeLeft: '2 Days',
      percentage: 58,
      color: '#3b82f6',
      border: '#3b82f6',
    },
    {
      name: 'Saturn Project',
      lead: 'Samantha Henderson',
      timeline: '2 Months',
      timeLeft: '9 Days',
      percentage: 32,
      color: '#6b7280',
      border: '#6b7280',
    },
  ];

  const projectsToRender = defaultProjects;

  return (
    <main className="flex mb-6 bg-[#171720] text-[#FFFFFF]">

      <div className="bg-[#171720] px-6">
        {showRecords ? (
          <Records />
        ) : (
          <div className="flex justify-between flex-wrap gap-y-6 mt-4">
            {projectsToRender.map((project, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className="cursor-pointer"
              >
                <ProgressCard
                  name={project.name}
                  lead={project.lead}
                  timeline={project.timeline}
                  timeLeft={project.timeLeft}
                  percentage={project.percentage}
                  color={project.color}
                  border={project.border}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Target;
