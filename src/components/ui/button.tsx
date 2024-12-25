import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  ' whitespace-nowrap transition-colors focus-visible:outline-none disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-primary-900 text-white disabled:bg-gray-700',
        secondary:
          'bg-blue-900 text-white hover:bg-[#131856] disabled:bg-gray-700',
        outline:
          'bg-transparent border border-gray-700 text-gray-900 hover:bg-gray-500 hover:border-gray-600 disabled:border-[#3d4249]',
        gray: 'bg-gray-500 text-gray-900 disabled:bg-gray-700',
        transparent:
          'bg-transparent text-gray-900 border-lg disabled:text-gray-600',
      },
      size: {
        default: 'h-12 rounded px-4 py-2 button-lg',
        sm: 'h-10 rounded px-4 py-2 label1-typo',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
