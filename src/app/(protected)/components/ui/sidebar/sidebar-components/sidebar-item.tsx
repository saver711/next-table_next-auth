import { useSidebarStore } from '@/app/(protected)/store/sidebar.store';
import { useWindowSize } from '@/lib/soli/hooks/ui/use-window-size';
import { cn } from '@/lib/utils';
import ChevronDownIcon from '@/public/assets/icons/chevron-down.svg';
import Link from 'next/link';
import { SidebarItem as SidebarItemModel } from '../models/sidebar-item.model';
import { SidebarSubmenuItem } from './sidebar-submenu-item';
type SidebarItemProps = SidebarItemModel & {
  openedSubmenu: string | null;
  setOpenedSubmenu: () => void;
  isActive: boolean;
};
export const SidebarItem = ({
  Icon,
  label,
  link,
  submenu,
  openedSubmenu,
  setOpenedSubmenu,
  isActive,
}: SidebarItemProps) => {
  const { isDesktop } = useWindowSize();
  const isSidebarOpened = useSidebarStore((state) => state.isSidebarOpened);
  const openSidebar = useSidebarStore((state) => state.openSidebar);
  const isSubmenuOpened = openedSubmenu === label;

  const sidebarItemClickHandler = () => {
    setOpenedSubmenu();
    !link && openSidebar();
  };

  return (
    <li
      data-tooltip-id='tooltip'
      data-tooltip-content={label}
      className={cn(
        'relative first-of-type:mt-4 last-of-type:after:absolute last-of-type:after:-bottom-2 last-of-type:after:left-0 last-of-type:after:h-[1px] last-of-type:after:w-full last-of-type:after:bg-gray-500',
        {
          'last-of-type:after:content-none': !isSidebarOpened,
        }
      )}
    >
      <Link
        onClick={sidebarItemClickHandler}
        href={link || ''}
        className={cn(
          'flex items-center gap-2 rounded-lg p-2 font-normal text-gray-800 hover:bg-primary-500 hover:text-primary-900',
          {
            'bg-primary-500 text-primary-900':
              isActive || (isSidebarOpened && isSubmenuOpened),
            'font-medium': isSubmenuOpened,
          }
        )}
      >
        {Icon && (
          <Icon className={cn({ 'mx-auto': !isSidebarOpened && isDesktop })} />
        )}

        {(!isDesktop || (isSidebarOpened && isDesktop)) && <span>{label}</span>}

        {!link && isSidebarOpened && (
          <ChevronDownIcon
            className={cn('ms-auto !text-gray-800 transition-all', {
              'rotate-180': isSubmenuOpened,
            })}
          />
        )}
      </Link>
      {submenu?.length && (
        <ul
          className={cn(
            'ms-6 flex flex-col gap-2 overflow-hidden border-s-[1px] border-s-gray-500 p-2 ps-[14px] transition-all',
            {
              'h-0 py-0': !isSubmenuOpened || !isSidebarOpened,
              'h-auto pb-0': isSubmenuOpened && isSidebarOpened,
            }
          )}
        >
          {submenu?.map((submenuItem) => (
            <SidebarSubmenuItem key={submenuItem.label} {...submenuItem} />
          ))}
        </ul>
      )}
    </li>
  );
};
