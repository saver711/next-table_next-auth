'use client';

import { ERROR_FALLBACK } from '@/app/consts/api/error-fallback.const';
import { UiBlocker } from '@/components/soli/ui/ui-blocker';
import { Button } from '@/components/ui/button';
import { ErrorCode } from '@/lib/soli/models/api/error-code.enum';
import BigSpinner from '@/public/assets/icons/big-spinner.svg';
import Image from 'next/image';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { VERIFICATION_LINK_SENT_DESCRIPTION_TXT } from '../consts/verification-link-sent-description-txt.const';
import { requestTokenAction } from './actions/request-valid-link.action';
import { validateTokenAction } from './actions/validate-token.action';
import { SetPasswordForm } from './components/set-password-form';

type SetPasswordProps = {
  searchParams: {
    token: string | undefined;
  };
};
const SetPassword = ({ searchParams }: SetPasswordProps) => {
  const token = searchParams.token;

  // VALIDATE THE TOKEN ON FIRST LOAD
  const {
    isPending: isExecuting,
    execute,
    error,
    isSuccess: hasSucceeded,
  } = useServerAction(validateTokenAction);

  useEffect(() => {
    execute({ token: token! });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const errorDescription =
    error?.message == ErrorCode.API_TOKEN_INVALID
      ? 'The password reset link sent to your email has expired. Each link is valid for 10 mins and can only be used once. To request a new password reset link, please click the button below.'
      : undefined;
  const errorTitle =
    error?.message == ErrorCode.API_TOKEN_INVALID
      ? 'Reset Link Expired'
      : ERROR_FALLBACK;

  // REQUEST TOKEN AGAIN
  const {
    execute: executeRequestToken,
    isPending: isRequestingToken,
    isSuccess: hasRequestedToken,
  } = useServerAction(requestTokenAction, {
    onError: ({ err }) => {
      const description = err.message;
      toast.error('Error', { description });
    },
  });
  const requestNewToken = () => executeRequestToken({ token: token! });

  return (
    <>
      {isExecuting && (
        <UiBlocker
          description='Validating token, Please wait...'
          icon={<BigSpinner className='animate-spin' />}
        />
      )}

      {!token && (
        <UiBlocker
          title={ERROR_FALLBACK}
          description='Missing token'
          href='/login'
          buttonText='Back to login'
        />
      )}

      {hasRequestedToken && (
        <UiBlocker
          title='Verification mail Sent'
          description={VERIFICATION_LINK_SENT_DESCRIPTION_TXT}
          href='/login'
          buttonText='Back to login'
          icon={
            <Image
              src='/assets/images/email-sent.png'
              alt='Email sent successfully'
              width={112}
              height={112}
            />
          }
        />
      )}

      {error && token && (
        <UiBlocker
          {...(error.message == ErrorCode.API_TOKEN_INVALID
            ? {
                icon: (
                  <Image
                    src='/assets/images/expired-link.png'
                    alt='Email sent successfully'
                    width={112}
                    height={112}
                  />
                ),
                footer: (
                  <Button
                    className='w-56 max-w-full'
                    disabled={isRequestingToken}
                    onClick={requestNewToken}
                  >
                    {isRequestingToken ? 'Requesting...' : 'Request Link'}
                  </Button>
                ),
              }
            : {
                href: '/login',
                buttonText: 'Back to login',
              })}
          title={errorTitle}
          description={errorDescription}
        />
      )}

      {hasSucceeded && token && (
        <section className='min-h-screen bg-[rgba(251,251,251,0.89)] px-7 py-24 sm:px-32 sm:py-40 md:w-1/2 md:px-24'>
          <SetPasswordForm token={token} />
        </section>
      )}
    </>
  );
};
export default SetPassword;
