import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';
import { SoliTextLogo } from './soli-text-logo';

type UiBlockerProps =
  | {
      title?: string;
      description?: string;
      href: string;
      buttonText: string;
      footer?: never;
      icon?: ReactNode;
    }
  | {
      title?: string;
      description?: string;
      href?: never;
      buttonText?: never;
      footer: ReactNode;
      icon?: ReactNode;
    }
  | {
      title?: string;
      description?: string;
      href?: never;
      buttonText?: never;
      footer?: ReactNode;
      icon?: ReactNode;
    };

export const UiBlocker = ({
  title,
  icon,
  description,
  href,
  buttonText,
  footer,
}: UiBlockerProps) => {
  return (
    <div className="absolute left-0 top-0 z-50 flex min-h-screen w-screen items-center justify-center bg-[url('/assets/images/solar-cells.webp')] after:absolute after:left-0 after:top-0 after:-z-[1] after:h-full after:w-full after:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.85)_100%)] after:backdrop-blur-[30px]">
      <SoliTextLogo className='absolute left-12 top-16' />
      <div className='flex max-w-[35.4375rem] flex-col items-center gap-6 px-3 text-center md:px-0'>
        {icon && icon}
        {title && <h1 className='text-secondary-blue-900'>{title}</h1>}
        {description && (
          <p className='body20-typo text-secondary-shade'>{description}</p>
        )}
        {href && buttonText && (
          <Link className='mx-auto mt-6 block w-56 max-w-full' href={href}>
            <Button className='w-full'>{buttonText}</Button>
          </Link>
        )}

        {footer && footer}
      </div>
    </div>
  );
};
