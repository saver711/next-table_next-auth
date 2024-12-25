import { ElementType, ReactNode } from 'react';

export type SidebarItem = {
  label: string;
  Icon: ElementType;
  link?: `/${string}`;
  submenu?: SidebarSubmenuItem[];
};

export type SidebarSubmenuItem = {
  label: string;
  link: `/${string}`;
};
