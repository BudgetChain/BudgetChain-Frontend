import React from 'react';
import ProjectCard from './components/ProjectCard';
import OutcomeStatistics from './components/OutcomeStatistics';
import { ArrowLeft } from 'lucide-react';
import TransactionTable from './components/TransactionTable';

const Dashboard = () => {
  return (
    <div className="bg-[#0a0a12] min-h-screen text-white p-8">
      <div className="flex gap-4 w-fit -z-0 border-b border-[#EBEBEB] items-center text-gray-400">
        <h1 className="text-2xl cursor-pointer z-10 border-b-2 border-[#4F4AE6] font-semibold">
          Records
        </h1>
        <span className="ml-8 cursor-pointer whitespace-nowrap  text-gray-500">
          Add New Project
        </span>
      </div>
      <ArrowLeft className="text-xl cursor-pointer mt-4" size={30} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 w-full gap-6">
        <ProjectCard key="project-card" />
        <OutcomeStatistics key="outcome-statistics" />
      </div>

      <TransactionTable />
    </div>
  );
};

export default Dashboard;
