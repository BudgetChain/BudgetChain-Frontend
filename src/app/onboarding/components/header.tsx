import { Search, Download, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex flex-col text-white py-4 px-5 rounded-lg">
      {/* Top section with search and wallet info */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-[16.5rem] top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent rounded-xl pl-10 pr-4 py-3 w-[300px] text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 shadow-[0px_0px_4px_0px_#EBEBEB40]"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center w-72 justify-center gap-2 bg-transparent rounded-xl px-4 py-3 shadow-[0px_0px_4px_0px_#EBEBEB40]">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-sm">Eli'z DAO</span>
          </div>

          <button className="bg-transparent rounded-xl w-72  px-4 py-3 text-sm shadow-[0px_0px_4px_0px_#EBEBEB40]">
            0xdf23Z.....bF42I5G
          </button>
        </div>
      </div>

      {/* Bottom section with transactions and image */}
      <div className="flex justify-between items-center bg-gradient-to-r from-[#171720] to-[#251B39] rounded-xl px-4 shadow-[0px_0px_4px_0px_#EBEBEB40] ">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-sm mb-1">
            <p className="text-[#E6E6E6]">Total Transactions</p>
            <div className="flex items-center pl-2">
              <select
                className="appearance-none bg-transparent text-md text-[#848484] focus:outline-none cursor-pointer"
                defaultValue="$TRK"
              >
                <option value="$TRK">$TRK</option>
                <option value="$ETH">$ETH</option>
                <option value="$BTC">$BTC</option>
              </select>
              <span className=" text-[#848484] cursor-pointer text-[10px]">
                <ChevronDown size={20} />
              </span>
            </div>
          </div>

          <p className="text-4xl my-3 font-bold mb-4 text-[#EBEBEB]">75</p>

          <button className="flex items-center text-[#EBEBEB] gap-2 bg-transparent border border-[#4F4AE6] rounded-lg px-4 py-3 text-sm transition-colors">
            <span>Download Records</span>
            <Download className="h-4 w-4" />
          </button>
        </div>

        <div className="">
          <Image
            src="/headerImg.png"
            alt="Transaction illustration"
            width={200}
            height={100}
            className="object-contain"
          />
        </div>
      </div>
    </header>
  );
}
