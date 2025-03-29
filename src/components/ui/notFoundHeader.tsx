'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Logo from '../../../public/svg/Logo.svg';
import { usePathname } from 'next/navigation';
import { Button } from './button';
import { Search } from 'lucide-react';

const NotFoundHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  const isActive = (href: string) => pathname === href;
  const handleToggle = () => {};
  return (
    <header className="bg-[#060612] mt-6 md:mt-10 text-white rounded-[20px] lg:border lg:border-[#EBEBEB80] md:max-w-6xl mx-auto">
      <nav className="flex w-full items-center justify-between px-6 md:px-10 py-4 ">
        {/* Logo */}
        <Link href={'/'}>
          <div className="text-white h-[37.34px] w-[157px] pr-4">
            <Image
              src={Logo}
              width={50}
              height={50}
              alt="Logo"
              className="w-full h-full object-fill"
            />
          </div>
        </Link>

        {/* Button and search */}
        <div className="flex md:space-x-4">
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search..."
              id="search"
              className="w-[210px] h-[50px] hidden md:flex rounded-[12px] border border-[#EBEBEB80] border-solid focus:outline-none bg-transparent transition pl-4 pr-[40px]"
            />
            <section className="w-[50px] h-[50px] hidden md:flex items-center justify-center absolute right-0 top-0 cursor-pointer">
              <Search size={20} className="text-gray-400  " />
            </section>
          </div>
          <a href="/">
            <Button
              variant={'secondary'}
              className="w-[130px] md:w-[170px] h-[40px] md:h-[50px] md:rounded-xl"
            >
              Back Home
            </Button>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NotFoundHeader;
