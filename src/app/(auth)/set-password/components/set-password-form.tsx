'use client';
import { LoadingMsg } from '@/components/soli/alerts/loading-msg';
import { PasswordFormField } from '@/components/soli/form-elements/password-form-field';
import { Divider } from '@/components/soli/ui/divider';
import { SoliTextLogo } from '@/components/soli/ui/soli-text-logo';
import { UiBlocker } from '@/components/soli/ui/ui-blocker';
import { Button } from '@/components/ui/button';
import { Form, FormLabel } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import CheckmarkCircleBroken from '@/public/assets/icons/checkmark-circle-broken.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { setPasswordAction } from '../actions/set-password.action';
import { SET_PASSWORD_FORM_SCHEMA } from '../consts/set-password-form-schema.const';
import { SetPasswordFormParams } from '../models/set-password-form-params.model';
import { PasswordRulesValidator } from './password-rules-validator/password-rules-validator';
type SetPasswordFormComponentParams = {
  token: string;
};
export const SetPasswordForm = ({ token }: SetPasswordFormComponentParams) => {
  const router = useRouter();
  const {
    execute,
    isPending,
    isSuccess: hasChangedPassword,
  } = useServerAction(setPasswordAction, {
    onSuccess: () => {
      toast.success('Password created', {
        description: 'Your password has been created successfully.',
      });
      signOut({ redirect: false });
    },
  });

  const form = useForm<SetPasswordFormParams>({
    resolver: zodResolver(SET_PASSWORD_FORM_SCHEMA),
    defaultValues: {
      password: '',
      confirmPassword: '',
      token,
    },
  });

  const onSubmit = (data: any) => {
    execute(data);
  };

  return hasChangedPassword ? (
    <UiBlocker
      title='Password Changed'
      description='Your new password is now set , you can now  try to login again from login page'
      href='/login'
      buttonText='Back to login'
    />
  ) : (
    <>
      <SoliTextLogo className='mb-[7.5rem]' />
      <h1 className='mb-2 text-secondary-blue-900'>Setting your password</h1>
      <p className='body-typo mb-10 text-secondary-shade'>
        Please enter your new password to proceed
      </p>

      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-y-4'
        >
          <div className='flex flex-col gap-1'>
            <FormLabel htmlFor='password'>
              Password
              <span className='text-error-700'> *</span>
            </FormLabel>
            <PasswordFormField
              control={form.control}
              name='password'
              placeholder='Please enter your password'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <FormLabel htmlFor='confirmPassword'>
              Confirm Password
              <span className='text-error-700'> *</span>
            </FormLabel>
            <PasswordFormField
              control={form.control}
              name='confirmPassword'
              placeholder='Please enter your password'
            />
          </div>

          <div>
            <h6 className='mb-3 font-bold text-gray-900'>
              In order to protect your account, make sure your password:
            </h6>

            <PasswordRulesValidator
              className='flex flex-col gap-2'
              itemClassName='body-typo gap-2'
              rules={['minLength', 'capitalAndLowerCase', 'noSpaces']}
              minLength={7}
              value={form.watch('password')}
              iconComponents={{
                ValidIcon: <CheckmarkCircleBroken />,
                InvalidIcon: <CheckmarkCircleBroken />,
              }}
              validItemClassName={
                form.formState.isDirty ? 'text-success-800' : 'text-gray-800'
              }
              invalidItemClassName={
                form.formState.isDirty ? 'text-error-700' : 'text-gray-800'
              }
            />
            <Button
              disabled={isPending}
              type='submit'
              size='default'
              className='mt-10 w-full'
            >
              Create Password
            </Button>
          </div>
        </form>
      </Form>

      {isPending && (
        <LoadingMsg className='mt-6' loadingMsg='Loading, please wait...' />
      )}

      <Divider className='my-8' />

      <div className='mt-0 flex items-center justify-center gap-1'>
        <p className='text-lg text-gray-900'>Remember your password?</p>
        <Link href='/login' className='text-lg font-medium text-primary-900'>
          Login
        </Link>
      </div>
    </>
  );
};
