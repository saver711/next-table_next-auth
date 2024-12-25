import { SoliTextLogo } from '@/components/soli/ui/soli-text-logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { forgotPasswordAction } from '../actions/forgot-password.action';

type EmailRequestSentProps = { email: string };
export const EmailRequestSent = ({ email }: EmailRequestSentProps) => {
  const { execute } = useServerAction(forgotPasswordAction, {
    onSuccess: () => {
      toast.success('Email sent', { description: 'Email sent successfully.' });
      setStatus('countdown');
      setCountdown(60);
    },
    onError: ({ err }) => {
      setStatus('idle');
      const description = err.message;
      toast.error('Error', { description });
    },
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'countdown'>(
    'countdown'
  );
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (status === 'countdown' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (status === 'countdown' && countdown === 0) {
      setStatus('idle');
    }

    return () => clearInterval(timer);
  }, [status, countdown]);

  const handleResend = () => {
    setStatus('loading');
    execute({ email });
  };
  return (
    <>
      <SoliTextLogo className='absolute left-11 top-16' />
      <div className='max-w-[35.4375rem] px-7 sm:px-0'>
        <div className='flex flex-col items-center gap-6 text-center'>
          <h1 className='text-secondary-blue-900'>Request Send</h1>
          <p className='body20-typo text-secondary-shade'>
            We’ve sent you an email to reset your password, check your inbox &
            follow the instructions
          </p>

          <div className='flex gap-2'>
            <p className='label1-typo text-secondary-blue-900'>
              Didn’t receive an email?
            </p>

            <button
              onClick={handleResend}
              disabled={status === 'loading' || status === 'countdown'}
              className={cn('body-typo text-primary-900', {
                'cursor-pointer': status === 'idle',
                'cursor-not-allowed': status !== 'idle',
              })}
            >
              {status === 'loading' && 'Sending...'}
              {status === 'countdown' && `Resend in ${countdown}s`}
              {status === 'idle' && 'Resend'}
            </button>
          </div>
        </div>

        <Link className='mx-auto mt-12 block w-56 max-w-full' href='/login'>
          <Button className='w-full'>Back to login</Button>
        </Link>
      </div>
    </>
  );
};
