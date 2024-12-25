import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import CloseIcon from '../../../../public/assets/icons/close-icon.svg';

type alertProps = {
  variant: 'error' | 'default';
  message: string;
  className?: string;
};

export const CustomAlert = ({ variant, message, className }: alertProps) => {
  return (
    <Alert variant={variant} className={className}>
      <div className='flex items-center gap-x-4'>
        {variant === 'error' && <CloseIcon />}
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  );
};
