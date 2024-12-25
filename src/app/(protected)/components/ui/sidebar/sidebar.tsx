'use client';

import { useSidebarStore } from '@/app/(protected)/store/sidebar.store';
import { ClientOnlyPortal } from '@/components/soli/ui/client-only-portal';
import { SoliLogo } from '@/components/soli/ui/soli-logo';
import { SoliTextLogo } from '@/components/soli/ui/soli-text-logo';
import { useWindowSize } from '@/lib/soli/hooks/ui/use-window-size';
import { cn } from '@/lib/utils';
import BurgerIcon from '@/public/assets/icons/burger.svg';
import XIcon from '@/public/assets/icons/x.svg';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import {
  SIDEBAR_DATA,
  STATION_SIDEBAR_DATA,
} from './consts/sidebar-items-data.const';
import { SidebarItem as SidebarItemModel } from './models/sidebar-item.model';
import { SidebarItem } from './sidebar-components/sidebar-item';
export const Sidebar = () => {
  const params = useSearchParams();
  const selectedStation = params.get('selectedStation');
  const sidebarData = selectedStation ? STATION_SIDEBAR_DATA : SIDEBAR_DATA;
  const { isDesktop } = useWindowSize();
  const [openedSubmenu, setOpenedSubmenu] = useState<string | null>(null);
  const isSidebarOpened = useSidebarStore((state) => state.isSidebarOpened);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  const pathname = usePathname();
  useEffect(() => {
    sidebarData.forEach((item) => {
      if (item.submenu?.some((subItem) => subItem.link === pathname)) {
        setOpenedSubmenu(item.label);
      }
    });
  }, [pathname, sidebarData]);

  const isActive = (sidebarItem: SidebarItemModel) => {
    return (
      pathname === sidebarItem.link ||
      sidebarItem.submenu?.some((subItem) => subItem.link === pathname) ||
      false
    );
  };

  return (
    <ClientOnlyPortal>
      <aside
        className={cn(
          'fixed -left-[20.75rem] top-0 z-10 min-h-screen w-[20.75rem] max-w-[calc(100%-2.6rem)] bg-white p-4 shadow-[1px_4px_4px_0_rgba(0,0,0,0.07)] transition-all',
          {
            'left-0': isSidebarOpened,
            'left-0 w-20': !isSidebarOpened && isDesktop,
          }
        )}
      >
        {/* HEADER */}
        <div className='flex justify-between border-b-[.0625rem] border-b-gray-500 py-3 text-gray-800'>
          {isDesktop && !isSidebarOpened ? (
            <Link href='/' className='mx-auto py-3'>
              <SoliLogo />
            </Link>
          ) : (
            <Link href='/'>
              <SoliTextLogo width={112} height={26.3} />
            </Link>
          )}

          {isDesktop && isSidebarOpened ? (
            <BurgerIcon className='cursor-pointer' onClick={toggleSidebar} />
          ) : (
            !isDesktop && (
              <XIcon className='cursor-pointer' onClick={toggleSidebar} />
            )
          )}
        </div>

        <ul className='flex flex-col gap-1'>
          {isDesktop && !isSidebarOpened && (
            <li
              className={cn(
                'mb-6 mt-4 max-h-6 overflow-hidden text-gray-800 transition-all',
                {
                  'max-h-0': isSidebarOpened,
                }
              )}
            >
              <BurgerIcon
                className='mx-auto cursor-pointer'
                onClick={toggleSidebar}
              />
            </li>
          )}

          {sidebarData.map((sidebarItem) => (
            <SidebarItem
              key={sidebarItem.label}
              isActive={isActive(sidebarItem)}
              openedSubmenu={openedSubmenu}
              setOpenedSubmenu={() => setOpenedSubmenu(sidebarItem.label)}
              {...sidebarItem}
            />
          ))}
        </ul>

        <Tooltip
          id='tooltip'
          place='right'
          className='!bg-primary-800'
          hidden={isSidebarOpened}
        />
      </aside>

      <div
        onClick={toggleSidebar}
        className={cn(
          'invisible fixed left-0 top-0 z-[9] h-screen w-screen bg-black opacity-0 transition-opacity delay-75',
          {
            'visible opacity-25': isSidebarOpened,
          }
        )}
      />
    </ClientOnlyPortal>
  );
};
