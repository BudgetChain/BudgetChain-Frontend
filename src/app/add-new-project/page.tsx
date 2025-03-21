import React from 'react';
import Sidebar from '../onboarding/components/siderBar';
import Project from './project';

export default function AddNewProject() {
  return (
    <div className="grid grid-cols-[auto,1fr] min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Project Form */}
      <Project />
    </div>
  );
}
