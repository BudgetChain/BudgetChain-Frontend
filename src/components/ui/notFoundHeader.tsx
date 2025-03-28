'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Logo from '../../../public/svg/Logo.svg';
import { usePathname } from 'next/navigation';
import { Button } from './button';

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
          <input
            type="text"
            name="search"
            placeholder="Search..."
            id="search"
            className="w-[210px] h-[50px] hidden md:flex rounded-[12px] border border-[#EBEBEB80] border-solid focus:outline-none bg-transparent transition pl-4"
          />
          {/* <button className="w-[170px] h-[50px] rounded-[12px] bg-white px-4 py-2 text-black transition hover:bg-opacity-80">
            Back to Home
          </button> */}
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
