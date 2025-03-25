'use client';

import type React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  FolderKanban,
  ArrowLeftRight,
  Target,
  FileText,
  Calendar,
  Settings,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  submenu?: boolean;
  expanded?: boolean;
  notification?: number;
};

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', href: '/home' },
  { icon: FolderKanban, label: 'Projects', href: '/projects' },
  { icon: ArrowLeftRight, label: 'Transactions', href: '/transactions' },
  { icon: Target, label: 'Target', href: '/target' },
  {
    icon: FileText,
    label: 'Appeals',
    href: '/appeals',
    submenu: true,
    expanded: false,
    notification: 1,
  },
  { icon: Calendar, label: 'Schedules', href: '/schedules' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help centre', href: '/help' },
];

export function Sidebar() {
  const [items, setItems] = useState(navItems);

  const toggleSubmenu = (index: number) => {
    const newItems = [...items];
    if (newItems[index].submenu) {
      newItems[index].expanded = !newItems[index].expanded;
      setItems(newItems);
    }
  };

  return (
    <aside className="${montserrat.variable} font-montserrat w-64 hidden md:flex flex-col bg-[#050512] rounded-md h-full min-h-screen p-4 ml-4 border border-green-500">
      <div className="flex justify-center mt-7">
        <Image src="/svg/Logo.svg" alt="Logo" width={121.61} height={10.64} />
      </div>
      <nav className="flex-1 overflow-y-auto p-2 mt-5 flex flex-col">
        <ul className="space-y-1 flex-grow">
          {items.slice(0, -2).map((item, index) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  'relative flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white group hover:text-[#4F4AE6]'
                )}
                onClick={
                  item.submenu
                    ? (e) => {
                        e.preventDefault();
                        toggleSubmenu(index);
                      }
                    : undefined
                }
              >
                <item.icon className="h-5 w-5 group-hover:text-[#4F4AE6]" />
                <span className="whitespace-nowrap group-hover:text-[#4F4AE6]">
                  {item.label}
                </span>
                {item.submenu && (
                  <ChevronDown
                    className={cn(
                      'ml-auto h-4 w-4 transition-transform group-hover:text-[#4F4AE6]',
                      item.expanded ? 'transform rotate-180' : ''
                    )}
                  />
                )}
                {item.notification && (
                  <div className="flex items-center justify-center ml-auto mr-1 h-5 w-5 rounded-full border text-xs group-hover:text-[#4F4AE6] group-hover:border-[#4F4AE6]">
                    {item.notification}
                  </div>
                )}
                
                <span className="absolute right-[-0.5rem] top-0 h-full w-1 bg-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>

              {item.submenu && item.expanded && (
                <ul className="mt-1 ml-6 space-y-1">
                  <li>
                    <Link
                      href="/appeals/pending"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-primary/10"
                    >
                      Pending Appeals
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/appeals/approved"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-primary/10"
                    >
                      Approved Appeals
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-1">
          {items.slice(-2).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white hover:text-blue-800"
            >
              <item.icon className="h-5 w-5 group-hover:text-blue-800" />
              <span className="whitespace-nowrap group-hover:text-blue-800">
                {item.label}
              </span>
              <span className="absolute right-[-0.5rem] top-0 h-full w-1 bg-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
