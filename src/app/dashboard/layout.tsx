'use client';

import { ReactNode } from 'react';
import Sidebar from './components/sideBar';
import NavBar from './components/navBar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex bg-[#171720] min-h-screen gap-4">
      <Sidebar />
      <div className="flex flex-col">
        <NavBar />
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
