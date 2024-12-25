import { ReactNode } from 'react';
import { Header } from './components/ui/header';
import { Sidebar } from './components/ui/sidebar/sidebar';

type ProtectedLayoutProps = {
  children: ReactNode;
};
// const DynamicSidebar = dynamic(
//   () =>
//     import('./components/ui/sidebar/sidebar').then((module) => module.Sidebar),
//   { ssr: false }
// );

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <main>
      <Header />
      {children}
      {/* <DynamicSidebar /> */}
      <Sidebar />
    </main>
  );
};
export default ProtectedLayout;
