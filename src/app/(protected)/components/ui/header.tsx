'use client';
import { SoliTextLogo } from '@/components/soli/ui/soli-text-logo';
import { useWindowSize } from '@/lib/soli/hooks/ui/use-window-size';
import BurgerIcon from '@/public/assets/icons/burger.svg';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSidebarStore } from '../../store/sidebar.store';

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isDesktop } = useWindowSize();
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  return (
    <>
      <header className='flex items-center px-4 py-2'>
        {!isDesktop && (
          <div className='flex gap-2'>
            <BurgerIcon className='cursor-pointer' onClick={toggleSidebar} />
            <Link href='/'>
              <SoliTextLogo width={112} height={26.3} />
            </Link>
          </div>
        )}
      </header>
      <div
        className='ms-36'
        onClick={() => {
          router.push(`${pathname}?selectedStation=12`);
        }}
      >
        Select station
      </div>
    </>
  );
};
