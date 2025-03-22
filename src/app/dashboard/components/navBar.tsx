'use client';
import { SearchIcon } from 'lucide-react';
const NavBar = () => {
  return (
    <nav className="w-full h-[100px] flex justify-between items-center px-4">
      <div className="flex items-center border-2 border-[#22222e] rounded-md overflow-x-hidden px-2">
        <input
          type="search"
          placeholder="Search..."
          className="w-[300px] h-[40px] bg-transparent text-white "
        />
        <SearchIcon size={20} />
      </div>
      <div className="flex gap-3 items-center">
        <input
          placeholder="Eli’z DAO"
          disabled
          className="w-[300px] h-[40px] bg-transparent border-2 border-[#22222e] text-white p-2 rounded-md text-center"
        />
        <input
          placeholder="0xdf23Z.....bF42I5G"
          disabled
          className="w-[300px] h-[40px] bg-transparent border-2 border-[#22222e] text-white p-2 rounded-md text-center"
        />
      </div>
    </nav>
  );
};

export default NavBar;
