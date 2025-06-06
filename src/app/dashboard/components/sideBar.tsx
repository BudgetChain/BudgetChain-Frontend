'use client';
import { FC, useState, useEffect } from 'react';
import Brand from '../../../../public/svg/Logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  FolderIcon,
  CreditCardIcon,
  TargetIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CalendarIcon,
  SettingsIcon,
  HelpCircleIcon,
  InfoIcon,
  Menu,
  X,
} from 'lucide-react';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  hasDropdown?: boolean;
  isOpen?: boolean;
  toggleDropdown?: (e: React.MouseEvent) => void;
}

const SidebarItem: FC<SidebarItemProps> = ({
  href,
  icon,
  text,
  active = false,
  hasDropdown = false,
  isOpen = false,
  toggleDropdown,
}) => {
  return (
    <Link
      href={hasDropdown ? '#' : href}
      className={`flex items-center px-4 py-3 text-sm transition-colors ${
        active
          ? 'text-indigo-900 border-r-2 border-indigo-900 bg-opacity-20 bg-indigo-900'
          : 'text-gray-400 hover:text-white hover:bg-gray-800 hover:bg-opacity-30'
      }`}
      onClick={hasDropdown && toggleDropdown ? toggleDropdown : undefined}
    >
      <span className="mr-3">{icon}</span>
      <span className="flex-grow">{text}</span>
      {hasDropdown && (
        <span className="ml-2">
          {isOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
        </span>
      )}
    </Link>
  );
};

const Sidebar: FC = () => {
  const pathname = usePathname();
  const [isAppealsOpen, setIsAppealsOpen] = useState(false);
  const [activePath, setActivePath] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle mobile sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Determine active path and dropdown state based on current route
    if (pathname.includes('/appeals')) {
      setIsAppealsOpen(true);
    }

    if (pathname === '/dashboard') {
      setActivePath('/');
    } else if (pathname.includes('/projects')) {
      setActivePath('/projects');
    } else if (pathname.includes('/transactions')) {
      setActivePath('/transactions');
    } else if (pathname.includes('/target')) {
      setActivePath('/target');
    } else if (pathname.includes('/appeals/pending')) {
      setActivePath('/appeals/pending');
    } else if (pathname.includes('/appeals/resolved')) {
      setActivePath('/appeals/resolved');
    } else if (pathname.includes('/appeals')) {
      setActivePath('/appeals');
    } else if (pathname.includes('/schedules')) {
      setActivePath('/schedules');
    } else if (pathname.includes('/settings')) {
      setActivePath('/settings');
    } else if (pathname.includes('/help')) {
      setActivePath('/help');
    } else {
      setActivePath('/');
    }
  }, [pathname]);

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAppealsOpen(!isAppealsOpen);
  };

  return (
    <>
      {/* Mobile toggle button - Fixed in top-left corner, always visible on mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-[#050512] z-50 px-4 flex items-center">
        <button
          className="p-2 rounded-md bg-gray-800 text-white"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar menu"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="ml-4">
          <Image src={Brand} alt="Logo" width={100} height={32} />
        </div>
      </div>

      {/* Main sidebar */}
      <div
        className={`fixed md:sticky top-0 w-64 h-screen bg-[#050512] text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } z-40 md:z-10 overflow-y-auto`}
      >
        {/* Only show logo in sidebar on desktop */}
        <Link href={'/'}>
          <div className="w-full mb-5 justify-center items-center pt-10 hidden md:flex">
            <Image src={Brand} alt="Logo" />
          </div>
        </Link>

        {/* Add padding on mobile to account for the header */}
        <div className="md:hidden h-16"></div>

        <div className="flex flex-col justify-between flex-grow overflow-y-auto">
          <div>
            <SidebarItem
              href="/dashboard"
              icon={<HomeIcon size={20} />}
              text="Home"
              active={activePath === '/'}
            />
            <SidebarItem
              href="/dashboard/projects"
              icon={<FolderIcon size={20} />}
              text="Projects"
              active={activePath === '/projects'}
            />
            <SidebarItem
              href="/dashboard/transactions"
              icon={<CreditCardIcon size={20} />}
              text="Transactions"
              active={activePath === '/transactions'}
            />
            <SidebarItem
              href="/dashboard/target"
              icon={<TargetIcon size={20} />}
              text="Target"
              active={activePath === '/target'}
            />
            <SidebarItem
              href="#"
              icon={<InfoIcon size={20} />}
              text="Appeals"
              active={
                activePath === '/appeals' || activePath.startsWith('/appeals/')
              }
              hasDropdown={true}
              isOpen={isAppealsOpen}
              toggleDropdown={handleToggleDropdown}
            />

            {isAppealsOpen && (
              <div className="pl-9 bg-gray-800 bg-opacity-40">
                <Link
                  href="/dashboard/appeals/pending"
                  className={`block py-2 px-4 text-sm transition-colors ${
                    activePath === '/appeals/pending'
                      ? 'text-indigo-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Pending
                </Link>
                <Link
                  href="/dashboard/appeals/resolved"
                  className={`block py-2 px-4 text-sm transition-colors ${
                    activePath === '/appeals/resolved'
                      ? 'text-indigo-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Resolved
                </Link>
              </div>
            )}

            <SidebarItem
              href="/dashboard/schedules"
              icon={<CalendarIcon size={20} />}
              text="Schedules"
              active={activePath === '/schedules'}
            />
          </div>

          <div className="pt-2">
            <SidebarItem
              href="/dashboard/settings"
              icon={<SettingsIcon size={20} />}
              text="Settings"
              active={activePath === '/settings'}
            />
            <SidebarItem
              href="/dashboard/help"
              icon={<HelpCircleIcon size={20} />}
              text="Help centre"
              active={activePath === '/help'}
            />
          </div>
        </div>

        <div className="p-4 text-xs text-gray-500 border-t border-gray-800">
          <p>© 2027 Ndida DAO</p>
        </div>
      </div>

      {/* Overlay that appears when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
