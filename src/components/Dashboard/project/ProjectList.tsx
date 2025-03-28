import React from 'react';
import Button from '@/components/form/Button';
import Select from '@/components/form/Select';
import { Plus } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  address: string;
  amountRequested: {
    strk: number;
    usd: number;
  };
  startDate: string;
  timeLeft: string;
  status: 'ACTIVE' | 'ON-HOLD';
}

interface ProjectListProps {
  onProjectClick: (id: number) => void;
  onAddClick: () => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  onProjectClick,
  onAddClick,
}) => {
  const projects: Project[] = [
    {
      id: 1,
      name: 'Ndida',
      address: 'OxcK4R....7G4F',
      amountRequested: {
        strk: 20000,
        usd: 10200,
      },
      startDate: '21/12/2026',
      timeLeft: '4 Weeks',
      status: 'ACTIVE',
    },
    {
      id: 2,
      name: 'Fragma',
      address: 'OxcK4R....7G4F',
      amountRequested: {
        strk: 0,
        usd: 1200,
      },
      startDate: '21/12/2026',
      timeLeft: '5 Days',
      status: 'ACTIVE',
    },
    {
      id: 3,
      name: 'Steloz',
      address: 'OxcK4R....7G4F',
      amountRequested: {
        strk: 2000,
        usd: 1200,
      },
      startDate: '21/12/2026',
      timeLeft: '2 Months',
      status: 'ON-HOLD',
    },
  ];

  return (
    <div className="mt-4">
      <div className="flex justify-end mb-4">
        <Button onClick={onAddClick}>
          {' '}
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>
      <div className="ring-2 ring-white/10 rounded-lg">
        <div className="flex items-center justify-between mb-3 p-6">
          <h3 className="text-xl font-semibold">All Projects</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[14px]">Filter by:</span>
              <Select
                options={[
                  { value: 'date_added', label: 'Date Added' },
                  { value: 'name', label: 'Name' },
                  { value: 'status', label: 'Status' },
                ]}
                className="min-w-[120px] bg-transparent border border-gray-800 text-[14px]"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-[#2B2B46]">
                <th className="py-3 px-6">S/N</th>
                <th className="py-3 px-6">Project</th>
                <th className="py-3 px-6">Address</th>
                <th className="py-3 px-6">Amount Requested</th>
                <th className="py-3 px-6">Start Date</th>
                <th className="py-3 px-6">Time Left</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t border-[#42415B]">
                  <td className="py-4 px-6">{project.id}</td>
                  <td className="py-4 px-6">{project.name}</td>
                  <td className="py-4 px-6">{project.address}</td>
                  <td className="py-4 px-6">
                    <div>
                      {project.amountRequested.strk > 0 && (
                        <div>
                          {project.amountRequested.strk} STRK
                          <div className="text-sm text-gray-400">
                            ${project.amountRequested.usd}
                          </div>
                        </div>
                      )}
                      {project.amountRequested.strk === 0 && (
                        <div className="text-gray-400">
                          ${project.amountRequested.usd}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">{project.startDate}</td>
                  <td className="py-4 px-6">{project.timeLeft}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === 'ACTIVE'
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-gray-700/30 text-gray-400'
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        onProjectClick(project.id);
                      }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
