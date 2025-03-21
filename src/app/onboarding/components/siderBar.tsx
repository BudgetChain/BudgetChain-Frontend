'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  FolderKanban,
  BarChart3,
  Target,
  ChevronDown,
  ChevronUp,
  Calendar,
  Settings,
  HelpCircle,
  Info,
} from 'lucide-react';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  hasDropdown?: boolean;
}

const NavItem = ({
  icon: Icon,
  label,
  href,
  isActive,
  hasDropdown,
}: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Link
        href={href}
        className={`flex items-center px-4 py-3 text-sm font-medium ${
          isActive
            ? 'text-blue-400'
            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
        }`}
      >
        <Icon
          className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-400' : 'text-gray-400'}`}
        />
        <span>{label}</span>
        {hasDropdown && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
            className="ml-auto"
          >
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        )}
      </Link>

      {hasDropdown && isOpen && (
        <div className="pl-12 py-1">
          <Link
            href="#"
            className="block py-2 text-sm text-gray-300 hover:text-white"
          >
            Appeal Requests
          </Link>
          <Link
            href="#"
            className="block py-2 text-sm text-gray-300 hover:text-white"
          >
            Appeal History
          </Link>
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-64 bg-[#0F1116] border-r border-gray-800">
      {/* Logo */}
      <div className="px-4 py-5">
        <h1 className="text-xl font-bold text-white tracking-wide">
          BUDGETCHAIN
          <div className="h-[2px] w-32 bg-gradient-to-r from-blue-500 to-blue-400 mt-1"></div>
        </h1>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 pt-2">
        <NavItem icon={Home} label="Home" href="/" />
        <NavItem
          icon={FolderKanban}
          label="Projects"
          href="/projects"
          isActive={true}
        />
        <NavItem icon={BarChart3} label="Transactions" href="/transactions" />
        <NavItem icon={Target} label="Target" href="/target" />
        <NavItem
          icon={Info}
          label="Appeals"
          href="/appeals"
          hasDropdown={true}
        />
        <NavItem icon={Calendar} label="Schedules" href="/schedules" />
      </nav>

      {/* Footer Navigation */}
      <div className="border-t border-gray-800 pt-2 pb-4">
        <NavItem icon={Settings} label="Settings" href="/settings" />
        <NavItem icon={HelpCircle} label="Help centre" href="/help" />
      </div>
    </div>
  );
}
