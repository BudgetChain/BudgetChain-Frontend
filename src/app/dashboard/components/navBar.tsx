'use client';
import React from 'react';
import { Search } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className="w-full h-16 md:h-[100px] bg-[#171720] flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center px-4 md:px-6 ">
      <div className="flex justify-center items-center w-full md:w-[300px] bg-transparent border-2 border-white/10 rounded-md px-4 overflow-hidden">
        <input
          placeholder="Search"
          className="w-full h-[48px] bg-transparent text-white pr-4 focus:outline-none"
        />
        <div className="">
          <Search size={20} className="text-gray-400" />
        </div>
      </div>

      <div className="hidden md:flex gap-3 items-center">
        <div className="w-[300px] h-[48px]  bg-transparent border-2 border-white/10 text-white rounded-md flex items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
            <span className="text-white">Eli`z DAO</span>
          </div>
        </div>

        <div className="w-[280px] h-[48px]  bg-transparent border-2 border-white/10 text-white rounded-md flex items-center justify-center">
          <span className="text-white">0xdf23Z.....bF42l5G</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
