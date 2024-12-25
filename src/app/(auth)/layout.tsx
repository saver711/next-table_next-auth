import { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="bg-[url('/assets/images/solar-cells.webp')] bg-cover bg-center bg-no-repeat">
      {children}
    </div>
  );
};
export default AuthLayout;
