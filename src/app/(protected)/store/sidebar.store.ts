import { create } from 'zustand';

type SidebarStore = {
  isSidebarOpened: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
};
export const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarOpened: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpened: !state.isSidebarOpened })),
  openSidebar: () => set({ isSidebarOpened: true }),
}));
