import AnalysisIcon from '@/public/assets/icons/analysis.svg';
import BillingIcon from '@/public/assets/icons/billing.svg';
import GearIcon from '@/public/assets/icons/gear.svg';
import GridIcon from '@/public/assets/icons/grid.svg';
import O_MIcon from '@/public/assets/icons/maintenance.svg';
import ReportIcon from '@/public/assets/icons/report.svg';
import SolarIcon from '@/public/assets/icons/solar.svg';
import { SidebarItem } from '../models/sidebar-item.model';

export const SIDEBAR_DATA: SidebarItem[] = [
  {
    Icon: GearIcon,
    label: 'My Portfolio',
    link: '/portfolio',
  },
  {
    Icon: ReportIcon,
    label: 'Reports',
    submenu: [
      {
        label: 'Pre-defined Reports',
        link: '/x',
      },
      {
        label: 'Custom Report',
        link: '/x',
      },
    ],
  },
  {
    Icon: AnalysisIcon,
    label: 'Analysis',
    submenu: [
      {
        label: 'Diagram Builder',
        link: '/x',
      },
      {
        label: 'System Diagram',
        link: '/x',
      },
      {
        label: 'Public Diagram',
        link: '/x',
      },
      {
        label: 'My Diagram',
        link: '/x',
      },
    ],
  },
  {
    Icon: O_MIcon,
    label: 'O&M',
    submenu: [
      {
        label: 'Checklists',
        link: '/x',
      },
      {
        label: 'Station Alarms',
        link: '/x',
      },
      {
        label: 'Custom Alarms',
        link: '/x',
      },
      {
        label: 'Station Tickets',
        link: '/x',
      },
      {
        label: 'Job Templates',
        link: '/x',
      },
      {
        label: 'Maintenance Jobs',
        link: '/x',
      },
    ],
  },
];

export const STATION_SIDEBAR_DATA: SidebarItem[] = [
  {
    Icon: GearIcon,
    label: 'My Portfolio',
    link: '/portfolio',
  },
  {
    Icon: GridIcon,
    label: 'Monitor Station',
    link: '/monitor',
  },
  {
    Icon: SolarIcon,
    label: 'Station',
    submenu: [
      {
        label: 'Station Profile',
        link: '/x',
      },
      {
        label: 'Devices',
        link: '/x',
      },
      {
        label: 'Station Users',
        link: '/x',
      },
    ],
  },
  {
    Icon: ReportIcon,
    label: 'Reports',
    submenu: [
      {
        label: 'Pre-defined Reports',
        link: '/x',
      },
      {
        label: 'Custom Report',
        link: '/x',
      },
    ],
  },
  {
    Icon: AnalysisIcon,
    label: 'Analysis',
    submenu: [
      {
        label: 'KPIs & Widgets',
        link: '/x',
      },
      {
        label: 'Diagram Builder',
        link: '/x',
      },
      {
        label: 'System Diagram',
        link: '/x',
      },
      {
        label: 'Public Diagram',
        link: '/x',
      },
      {
        label: 'My Diagram',
        link: '/x',
      },
    ],
  },
  {
    Icon: O_MIcon,
    label: 'O&M',
    submenu: [
      {
        label: 'Checklists',
        link: '/x',
      },
      {
        label: 'Station Alarms',
        link: '/x',
      },
      {
        label: 'Custom Alarms',
        link: '/x',
      },
      {
        label: 'Station Tickets',
        link: '/x',
      },
      {
        label: 'Job Templates',
        link: '/x',
      },
      {
        label: 'Maintenance Jobs',
        link: '/x',
      },
    ],
  },
  {
    Icon: BillingIcon,
    label: 'Billing',
    submenu: [
      {
        label: 'Invoices',
        link: '/xx',
      },
      {
        label: 'Meters',
        link: '/x',
      },
      {
        label: 'Meter Readings',
        link: '/x',
      },
      {
        label: 'Station consumers',
        link: '/x',
      },
    ],
  },
];
