import { cn } from '@/lib/utils';

type DividerProps = { className?: string };

export const Divider = ({ className }: DividerProps) => {
  return <span className={cn('block h-[1px] bg-gray-600', className)}></span>;
};
