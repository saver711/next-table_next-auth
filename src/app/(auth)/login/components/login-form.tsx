'use client';

import { DEFAULT_REDIRECT_ROUTE } from '@/auth/consts/auth-routes.const';
import { Button } from '@/components/ui/button';
import { Form, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { login } from '../actions/login.action';
import { LOGIN_FORM_SCHEMA } from '../consts/login-form-schema.const';

import { LoadingMsg } from '@/components/soli/alerts/loading-msg';
import { CheckboxFormField } from '@/components/soli/form-elements/checkbox-form-field';
import { PasswordFormField } from '@/components/soli/form-elements/password-form-field';
import { TextFormField } from '@/components/soli/form-elements/text-form-field';
import { SoliTextLogo } from '@/components/soli/ui/soli-text-logo';
import Link from 'next/link';
import { toast } from 'sonner';
import { LoginRegisterSwitch } from '../../components/login-register-switch';
import { LOGIN_FORM_DEFAULT_VALUES } from '../consts/login-form-default-values.const';
import { LoginFormParams } from '../models/login-form-params.model';
import { useServerAction } from 'zsa-react';

export const LoginForm = () => {
  const router = useRouter();

  const { execute, isPending } = useServerAction(login, {
    onSuccess: () => {
      router.push(DEFAULT_REDIRECT_ROUTE);
    },
    onError: ({ err }) => {
      const description = err.message;
      toast.error('Error', { description });
    },
  });

  const form = useForm<LoginFormParams>({
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
  });

  const onSubmit = (values: LoginFormParams) => {
    execute(values);
  };
  return (
    <>
      <SoliTextLogo />
      <div className='mt-[6.5rem] flex flex-col'>
        <h1 className='heading-1 mb-3 text-secondary-blue-900'>User Login</h1>
        <p className='body mb-10 text-secondary-shade'>
          Please enter your credentials to login
        </p>
        <LoginRegisterSwitch />
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-10 space-y-4'
          >
            <div className='flex flex-col gap-1'>
              <FormLabel htmlFor='email'>
                Email Address
                <span className='text-error-700'> *</span>
              </FormLabel>
              <TextFormField
                control={form.control}
                name='email'
                placeholder='Ex. Anonymous@gmail.com'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <FormLabel htmlFor='password'>
                Password
                <span className='text-error-700'> *</span>
              </FormLabel>
              <PasswordFormField
                control={form.control}
                name='password'
                placeholder='Please enter your password'
                wrapperClassName='mb-10'
              />
            </div>
            <div className='mb-6 flex items-center justify-between'>
              <CheckboxFormField
                control={form.control}
                id='remember-me'
                name='remembered'
                label='Remember me'
              />

              <Link
                href={'/forgot-password'}
                className='button-lg text-gray-900'
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              disabled={isPending}
              type='submit'
              variant='default'
              size='default'
              className='w-full'
            >
              Login
            </Button>

            {isPending && (
              <LoadingMsg loadingMsg='Logging in, please wait...' />
            )}
          </form>
        </Form>
      </div>
    </>
  );
};
