import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarSubmenuItem as SidebarSubmenuItemModel } from '../models/sidebar-item.model';

type SidebarSubmenuItemProps = SidebarSubmenuItemModel;
export const SidebarSubmenuItem = ({
  label,
  link,
}: SidebarSubmenuItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <li className='label3-typo relative text-gray-800 before:absolute before:-left-[15px] before:-top-1 before:h-4 before:w-3 before:rounded-bl-[4.5px] before:border-b-[1px] before:border-s-[1px] before:border-gray-500'>
      <Link
        href={link}
        className={cn(
          'relative left-0 flex gap-11 align-baseline transition-all hover:left-1',
          {
            'text-orange-300': isActive,
          }
        )}
      >
        <span>{label}</span>
      </Link>
    </li>
  );
};
