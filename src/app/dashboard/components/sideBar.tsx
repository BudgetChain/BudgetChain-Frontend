"use client";
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
  MenuIcon,
  XIcon,
} from 'lucide-react';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  hasDropdown?: boolean;
  isOpen?: boolean;
  toggleDropdown?: () => void;
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
      href={href}
      className={`flex items-center px-4 py-3 text-sm transition-colors ${
        active
          ? 'text-indigo-900 border-r-2 border-indigo-900'
          : 'text-gray-400 hover:text-white'
      }`}
      onClick={
        hasDropdown
          ? (e) => {
              e.preventDefault();
              if (toggleDropdown) toggleDropdown();
            }
          : undefined
      }
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
  const [activePath, setActivePath] = useState('/admin');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    switch (pathname) {
      case '/dashboard/admin':
        setActivePath('/dashboard/admin');
        break;
      case '/projects':
        setActivePath('/projects');
        break;
      case '/transactions':
        setActivePath('/transactions');
        break;
      case '/target':
        setActivePath('/target');
        break;
      case '/appeals':
        setActivePath('/appeals');
        setIsAppealsOpen(true);
        break;
      case '/appeals/pending':
        setActivePath('/appeals/pending');
        setIsAppealsOpen(true);
        break;
      case '/appeals/resolved':
        setActivePath('/appeals/resolved');
        setIsAppealsOpen(true);
        break;
      case '/schedules':
        setActivePath('/schedules');
        break;
      case '/settings':
        setActivePath('/settings');
        break;
      case '/help':
        setActivePath('/help');
        break;
      default:
        setActivePath('/dashboard/admin'); // Default active item
        break;
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-0 left-4 z-50 p-2 bg-[#050512] w-full rounded-md text-white md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <XIcon size={24} className='text-white' /> : <MenuIcon size={24} />}
      </button>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative w-[260px] h-screen bg-[#050512] text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } z-50 md:z-0`}
      >
        <div className="w-full mb-5 flex justify-center items-center pt-10">
          <Image src={Brand} alt="Logo" />
        </div>
        <div className="flex-grow">
          <SidebarItem
            href="/dashboard/admin"
            icon={<HomeIcon size={20} />}
            text="Home"
            active={activePath === '/dashboard/admin'}
          />
          <SidebarItem
            href="/projects"
            icon={<FolderIcon size={20} />}
            text="Projects"
            active={activePath === '/projects'}
          />
          <SidebarItem
            href="/transactions"
            icon={<CreditCardIcon size={20} />}
            text="Transactions"
            active={activePath === '/transactions'}
          />
          <SidebarItem
            href="/target"
            icon={<TargetIcon size={20} />}
            text="Target"
            active={activePath === '/target'}
          />
          <SidebarItem
            href="/appeals"
            icon={<InfoIcon size={20} />}
            text="Appeals"
            active={
              activePath === '/appeals' || activePath.startsWith('/appeals/')
            }
            hasDropdown={true}
            isOpen={isAppealsOpen}
            toggleDropdown={() => setIsAppealsOpen(!isAppealsOpen)}
          />

          {isAppealsOpen && (
            <div className="pl-9 bg-gray-800 bg-opacity-40">
              <Link
                href="/appeals/pending"
                className={`block py-2 text-sm ${
                  activePath === '/appeals/pending'
                    ? 'text-indigo-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Pending
              </Link>
              <Link
                href="/appeals/resolved"
                className={`block py-2 text-sm ${
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
            href="/schedules"
            icon={<CalendarIcon size={20} />}
            text="Schedules"
            active={activePath === '/schedules'}
          />

          <div className="mt-32 pt-2">
            <SidebarItem
              href="/settings"
              icon={<SettingsIcon size={20} />}
              text="Settings"
              active={activePath === '/settings'}
            />
            <SidebarItem
              href="/help"
              icon={<HelpCircleIcon size={20} />}
              text="Help centre"
              active={activePath === '/help'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;