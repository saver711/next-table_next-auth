'use client';
import { useState } from 'react';
import { EmailRequestSent } from './components/email-request-sent';
import ForgotPasswordForm from './components/forgot-password-form';
const ForgotPassword = () => {
  const [email, setEmail] = useState<string | null>(null);
  return (
    <>
      {!email && (
        <section className='min-h-screen bg-[rgba(251,251,251,0.89)] px-7 py-36 pb-14 sm:px-32 sm:py-52 md:w-1/2 md:px-24 md:py-60'>
          <ForgotPasswordForm setEmail={setEmail} />
        </section>
      )}

      {email && (
        <section className='relative flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(to_bottom,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.85)_100%)] backdrop-blur-[30px]'>
          <EmailRequestSent email={email} />
        </section>
      )}
    </>
  );
};
export default ForgotPassword;
