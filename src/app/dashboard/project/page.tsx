'use client';

import React, { useState } from 'react';
import ProjectList from '@/components/Dashboard/project/ProjectList';
import ProjectDetails from '@/components/Dashboard/project/ProjectDetails';
import AddProject from '@/components/Dashboard/project/AddProject';
import Button from '@/components/form/Button';
import { Download } from 'lucide-react';

type View = 'list' | 'details' | 'add';
type Tab = 'records' | 'add';

const Project = () => {
  const [currentView, setCurrentView] = useState<View>('list');
  const [currentTab, setCurrentTab] = useState<Tab>('records');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  const handleViewChange = (view: View, projectId?: number) => {
    setCurrentView(view);
    if (projectId) {
      setSelectedProjectId(projectId);
    }
  };

  const handleTabChange = (tab: Tab) => {
    setCurrentTab(tab);
    if (tab === 'records') {
      setCurrentView('list');
    } else {
      setCurrentView('add');
    }
  };

  return (
    <div className="space-y-6 p-10 bg-[#171720]">
      <div className="bg-[linear-gradient(to_right,_#171720_80%,_#894DBD_150%,_#5E5EFF_150%)] ring-2 ring-white/10 rounded-lg p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6">
        <div className="flex-1 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-sm sm:text-base lg:text-[16px] font-semibold text-white">
              Total Transactions
            </h2>
            <select className="bg-transparent text-sm sm:text-base lg:text-[16px] text-gray-400 border border-gray-600 sm:border-none rounded px-2 py-1 sm:p-0 outline-none focus:border-gray-400 sm:focus:border-none">
              <option className="bg-[#171720] text-sm sm:text-base lg:text-[16px]">
                STRK
              </option>
              <option className="bg-[#171720] text-sm sm:text-base lg:text-[16px]">
                USDC
              </option>
              <option className="bg-[#171720] text-sm sm:text-base lg:text-[16px]">
                ETH
              </option>
            </select>
          </div>
          <div className="mt-3 sm:mt-4">
            <span className="text-xl sm:text-2xl lg:text-[24px] font-bold text-white">
              75
            </span>
          </div>
          <Button
            className="mt-4 sm:mt-6 w-full sm:w-auto text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2"
            variant="outline"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span className="hidden sm:inline">Download Records</span>
            <span className="sm:hidden">Download</span>
          </Button>
        </div>
        <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 self-center sm:self-start">
          <img
            src="/coin.svg"
            alt="Transaction Icon"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="border-b border-gray-800">
        <div className="flex gap-8">
          <button
            className={`py-4 px-1 relative ${
              currentTab === 'records'
                ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                : 'text-[#848484] hover:text-gray-300'
            }`}
            onClick={() => handleTabChange('records')}
          >
            Records
          </button>
          <button
            className={`py-4 px-1 relative ${
              currentTab === 'add'
                ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                : 'text-[#848484] hover:text-gray-300'
            }`}
            onClick={() => handleTabChange('add')}
          >
            Add New Project
          </button>
        </div>
      </div>

      <div>
        {currentView === 'list' && (
          <ProjectList
            onProjectClick={(id) => handleViewChange('details', id)}
            onAddClick={() => handleTabChange('add')}
          />
        )}
        {currentView === 'details' && selectedProjectId && (
          <ProjectDetails
            projectId={selectedProjectId}
            onBack={() => handleViewChange('list')}
          />
        )}
        {currentView === 'add' && (
          <AddProject onBack={() => handleTabChange('records')} />
        )}
      </div>
    </div>
  );
};

export default Project;
