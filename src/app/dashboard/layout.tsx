'use client';

import { ReactNode } from 'react';
import Sidebar from './components/sideBar';
import NavBar from './components/navBar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex bg-[#171720] min-h-screen gap-0 md:gap-4">
      <Sidebar />
      <div className="flex flex-col w-full pt-20 md:pt-0">
        <NavBar />
        <div className="mt-6 w-full">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
