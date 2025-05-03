"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from '../../public/svg/Logo.svg';

const Navbar1: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Function to check if link is active
  const isActive = (href: string) => pathname === href;


  return (
    <header className="bg-[#060612] mt-10 text-white rounded-[20px] border border-[#EBEBEB80] max-w-6xl mx-auto">
      <nav className="flex max-w-7xl items-center justify-between px-4 py-4 w-[95%] mx-10">
        {/* Logo */}
        <Link href={'/dashboard/admin'}>
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

        {/* Desktop Menu */}
        <div className="hidden md:flex md:justify-center md:pl-20 md:items-center mr-6 md:space-x-6">
          {['about-us', 'white-paper', 'faqs', 'demo'].map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className={`hover:text-gray-300 ${
                isActive(`/${item}`)
                  ? 'text-blue-500 font-semibold border-b-2 border-blue-500'
                  : ''
              }`}
            >
              {item
                .replace('-', ' ') // Convert dashes to spaces
                .replace(/\b\w/g, (char) => char.toUpperCase())}{' '}
              {/* Capitalize each word */}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden mt-20">
          <button
            type="button"
            onClick={handleToggle}
            className="text-white transition hover:text-gray-300 focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                /* "X" icon */
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 
                  1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 
                  01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 
                  01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 
                  010-1.414z"
                />
              ) : (
                /* Hamburger icon */
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5h16v2H4zm0 6h16v2H4zm0 
                  6h16v2H4z"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu (visible when isOpen = true) */}
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-2 bg-[#060612] px-4 pb-4">
            {['about', 'whitepaper', 'faqs', 'demo'].map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className={`hover:text-gray-300 ${
                  isActive(`/${item}`)
                    ? 'text-blue-500 font-semibold border-b-2 border-blue-500'
                    : ''
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar1;
