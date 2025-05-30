'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from "../../../../public/svg/Logo.svg";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current path
  
  // Close mobile menu when window is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('nav')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Function to check if link is active
  const isActive = (href: string) => pathname === href;
  
  // Menu items
  const menuItems = [
    { name: 'ABOUT-US', path: '/ABOUT-US' },
    { name: 'WHITE-PAPER', path: '/WHITE-PAPER' },
    { name: 'FAQS', path: '/FAQS' },
    { name: 'DEMO', path: '/DEMO' }
  ];

  // Format the display text
  const formatDisplayText = (text: string) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <header className="bg-[#060612] mt-4 sm:mt-6 md:mt-10 text-white rounded-[20px] border border-[#EBEBEB80] max-w-6xl mx-auto">
      <nav className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 w-full sm:w-[95%] mx-auto sm:mx-4 md:mx-10 relative">
        {/* Logo */}
        <Link href={'/'}>
          <div className="text-white h-[30px] sm:h-[37.34px] w-[120px] sm:w-[157px]">
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
        <div className="hidden md:flex md:justify-center md:items-center md:space-x-4 lg:space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`text-sm lg:text-base hover:text-gray-300 transition-colors ${
                isActive(item.path)
                  ? 'text-blue-500 font-semibold border-b-2 border-blue-500'
                  : ''
              }`}
            >
              {formatDisplayText(item.name)}
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={handleToggle}
            className="text-white transition hover:text-gray-300 focus:outline-none p-2"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                /* "X" icon */
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z"
                />
              ) : (
                /* Hamburger icon */
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5h16v2H4zm0 6h16v2H4zm0 6h16v2H4z"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu (visible when isOpen = true) */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-4 bg-[#060612] px-6 pb-6 pt-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`block py-2 hover:text-gray-300 transition-colors ${
                isActive(item.path)
                  ? 'text-blue-500 font-semibold border-b border-blue-500'
                  : 'border-b border-gray-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {formatDisplayText(item.name)}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;