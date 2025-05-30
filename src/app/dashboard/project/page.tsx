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
      <div className="bg-[linear-gradient(to_right,_#171720_80%,_#894DBD_150%,_#5E5EFF_150%)] ring-2 ring-white/10 rounded-lg p-8 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[16px]">Total Transactions</h2>
            <select className="bg-transparent text-[16px] text-gray-400 border-none outline-none">
              <option className="text-[16px]">STRK</option>
            </select>
          </div>
          <div className="mt-2">
            <span className="text-[24px] font-bold">75</span>
          </div>
          <Button className="mt-4" variant="outline">
            {' '}
            <Download className="w-4 h-4" /> Download Records
          </Button>
        </div>
        <div className="">
          <img
            src="/coin.svg"
            alt="Transaction Icon"
            className="w-full h-full"
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
