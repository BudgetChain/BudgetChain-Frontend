'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MobileNav } from '@/components/LandingFeature/mobileNav';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export function Header() {
  return (
    <header
      className={`${montserrat.variable} font-montserrat p-2 md:p-4 flex items-center bg-[#171720] gap-2 md:gap-4 h-16 md:h-auto md:mt-0 mt-2`}
    >
      
      <div className="flex items-center gap-2 w-full md:w-auto flex-grow">
      
        <div className="hidden">
          <MobileNav />
        </div>

        <div className="relative flex-grow max-w-[75%] md:max-w-[300px] bg-[#171720] text-white h-9 md:h-auto md:ml-3 ml-12">
          <Input
            placeholder="Search"
            className="border-none placeholder-transparent pl-3 md:pr-10 pr-5 w-full h-10 md:h-auto text-xs md:placeholder-white md:text-base shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)]"
          />
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 md:w-4" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mr-6">
        <div className="py-0 px-5 md:px-10 md:py-1.5 rounded-md shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)] flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-xs md:text-sm text-white whitespace-nowrap">
            ELI's DAO
          </span>
        </div>

        <div className="px-2 text-xs md:text-sm text-white text-muted-foreground md:px-4 md:py-1.5 rounded-md shadow-[0px_0px_4px_0px_rgba(235,235,235,0.25)]">
          0x1F32...hF4DSG
        </div>
      </div>
    </header>
  );
}
