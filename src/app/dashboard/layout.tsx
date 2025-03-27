'use client';

import { ReactNode } from 'react';
import Sidebar from './components/sideBar';
import NavBar from './components/navBar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex bg-[#070716] min-h-screen">
      <Sidebar />
      <div className="flex-1 px-10">
        <NavBar />
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;