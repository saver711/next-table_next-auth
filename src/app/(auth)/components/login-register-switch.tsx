'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { ConfirmDialog } from '@/components/soli/ui/confirm-dialog';
import { useState } from 'react';
import Building from '../../../../public/assets/icons/building.svg';
import UsersIcon from '../../../../public/assets/icons/users.svg';

type LoginRegisterSwitchProps = {
  areSomeInputsFilled?: boolean;
};
export const LoginRegisterSwitch = ({
  areSomeInputsFilled = false,
}: LoginRegisterSwitchProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const path = !areSomeInputsFilled ? '/login' : '/register';
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const closeDialog = () => {
    setIsDialogVisible(false);
  };
  const handleDialogConfirmAction = () => {
    router.push('/login');
  };

  const handleLoginLinkClick = () => {
    if (areSomeInputsFilled) setIsDialogVisible(true);
  };

  return (
    <div className='flex items-center gap-1 sm:gap-[1.5rem]'>
      <ConfirmDialog
        open={isDialogVisible}
        title='Cancel Creation'
        description="You’re about to cancel the registration, Are you sure you want to
          cancel create this company? This can't be undone."
        confirmBtnLabel='Yes, Cancel'
        cancelBtnLabel='Keep Editing'
        onCancel={closeDialog}
        onConfirm={handleDialogConfirmAction}
      ></ConfirmDialog>
      <Link
        href={path}
        className={cn('text-gray-900', {
          'border-b-2 border-primary-900 pb-2 text-primary-900':
            pathname === '/login',
        })}
      >
        <div
          onClick={handleLoginLinkClick}
          className='xs:text-base flex items-center gap-2 px-1 text-sm'
        >
          <UsersIcon />
          <span>User Login</span>
        </div>
      </Link>
      <span className='xs:w-10 h-[1px] w-6 bg-gray-900'></span>
      <Link
        href='/register'
        className={cn('text-gray-900', {
          'border-b-2 border-primary-900 pb-2 text-primary-900':
            pathname === '/register',
        })}
      >
        <div className='xs:text-base flex items-center gap-2 px-1 text-sm'>
          <Building />
          <span>Register Your Company</span>
        </div>
      </Link>
    </div>
  );
};
