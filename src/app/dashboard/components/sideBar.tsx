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
          ? () => {
              // e.preventDefault();
              toggleDropdown && toggleDropdown();
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
  const [activePath, setActivePath] = useState('/target');

  useEffect(() => {
    switch (pathname) {
      case '/dashboard':
        setActivePath('/');
        break;
      case '/dashboard/projects':
        setActivePath('/projects');
        break;
      case '/dashboard/transactions':
        setActivePath('/transactions');
        break;
      case '/dashboard/target':
        setActivePath('/target');
        break;
      case '/appeals':
        setActivePath('/dashboard/appeals');
        setIsAppealsOpen(true);
        break;
      case '/dashboard/appeals/pending':
        setActivePath('/appeals/pending');
        setIsAppealsOpen(true);
        break;
      case '/dashboard/appeals/resolved':
        setActivePath('/appeals/resolved');
        setIsAppealsOpen(true);
        break;
      case '/dashboard/schedules':
        setActivePath('/schedules');
        break;
      case '/dashboard/settings':
        setActivePath('/settings');
        break;
      case '/dashboard/help':
        setActivePath('/help');
        break;
      default:
        setActivePath('/dashboard'); // Default active item
        break;
    }
  }, [pathname]);

  return (
    <div className="min-w-[260px] h-screen sticky bg-[#050512] text-white flex flex-col left-[20px] top-0 rounded-md">
      <div className="w-full mb-5 flex justify-center items-center pt-10">
        <Image src={Brand} alt="Logo" />
      </div>
      <div className="flex-grow">
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
          href="/dashboard/appeals"
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
              href="/dashboard/appeals/pending"
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
                activePath === '/dashboard/appeals/resolved'
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

        <div className="mt-32 pt-2">
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
    </div>
  );
};

export default Sidebar;
