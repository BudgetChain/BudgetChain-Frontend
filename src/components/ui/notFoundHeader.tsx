'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Logo from '../../../public/svg/Logo.svg';
import { usePathname } from 'next/navigation';

const NotFoundHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  const isActive = (href: string) => pathname === href;
  const handleToggle = () => {};
  return (
    <header className="bg-[#060612] mt-10 text-white rounded-[20px] border border-[#EBEBEB80] max-w-6xl mx-auto">
      <nav className="flex max-w-7xl items-center justify-between px-4 py-4 w-[95%] mx-10">
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
        <div className="hidden md:flex md:space-x-4">
          <input
            type="text"
            name=""
            placeholder="Search..."
            id=""
            className="w-[210px] h-[50px] rounded-[12px] border border-[#EBEBEB80] border-solid focus:outline-none bg-transparent transition hover:text-black pl-4"
          />
          <button className="w-[170px] h-[50px] rounded-[12px] bg-white px-4 py-2 text-black transition hover:bg-opacity-80">
            Back to Home
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NotFoundHeader;
