'use client';
import WalletConnectButton from '@/components/walletConnection/wallet-connect-button';
import { Search } from 'lucide-react';

const NavBar = () => {
  return (

    <nav className="w-full h-[100px] bg-[#171720] flex justify-between items-center px-6 ">
      <div className="flex justify-center items-center w-[300px] bg-transparent border-2 border-white/10 rounded-md px-4 overflow-hidden">

        <input
          placeholder="Search"
          className="w-full h-[48px] bg-transparent text-white pr-4 focus:outline-none"
        />
        <div className="">
          <Search size={20} className="text-gray-400" />
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="w-[300px] h-[48px]  bg-transparent border-2 border-white/10 text-white rounded-md flex items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
            <span className="text-white">Eli`z DAO</span>
          </div>
        </div>

        <div className="w-[300px] h-[48px] bg-[#181824] border border-gray-800 text-white rounded-md flex items-center justify-center">
          <WalletConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
