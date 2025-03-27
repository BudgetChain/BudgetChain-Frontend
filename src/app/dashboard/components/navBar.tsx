'use client';
import React from 'react';
import { Search } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className="w-full h-[100px] flex justify-between items-center px-4 ">
      <div className="relative w-[400px]">
        <input
          placeholder="Search"
          className="w-full h-[48px] bg-[#181824] border border-gray-800 rounded-md text-white px-4 focus:outline-none"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <Search size={20} className="text-gray-400" />
        </div>
      </div>
      
      <div className="flex gap-3 items-center">
        <div className="w-[300px] h-[48px] bg-[#181824] border border-gray-800 text-white rounded-md flex items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
            <span className="text-white">Eli`z DAO</span>
          </div>
        </div>
        
        <div className="w-[300px] h-[48px] bg-[#181824] border border-gray-800 text-white rounded-md flex items-center justify-center">
          <span className="text-white">0xdf23Z.....bF42l5G</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;