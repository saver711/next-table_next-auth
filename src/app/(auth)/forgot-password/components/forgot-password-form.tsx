import { LoadingMsg } from '@/components/soli/alerts/loading-msg';
import { Divider } from '@/components/soli/ui/divider';
import { SoliTextLogo } from '@/components/soli/ui/soli-text-logo';
import { Button } from '@/components/ui/button';
import { Form, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { forgotPasswordAction } from '../actions/forgot-password.action';
import { FORGOT_PASSWORD_FORM_SCHEMA } from '../consts/forgot-password-form-schema.const';
import { ForgotPasswordFormParams } from '../models/forgot-password-form-params.model';
import { TextFormField } from '@/components/soli/form-elements/text-form-field';
import { useServerAction } from 'zsa-react';

type ForgotPasswordFormComponentParams = {
  setEmail: Dispatch<SetStateAction<string | null>>;
};
const ForgotPasswordForm = ({
  setEmail,
}: ForgotPasswordFormComponentParams) => {
  const form = useForm<ForgotPasswordFormParams>({
    resolver: zodResolver(FORGOT_PASSWORD_FORM_SCHEMA),
    defaultValues: { email: '' },
  });

  const { execute, error, isPending } = useServerAction(forgotPasswordAction, {
    onSuccess: () => {
      const email = form.getValues('email');
      setEmail(email);
    },
    onError: ({ err }) => {
      const description = err.message;
      toast.error('Error', { description });
    },
  });

  const onSubmit = (data: ForgotPasswordFormParams) => {
    execute(data);
  };

  return (
    <>
      <SoliTextLogo className='mb-[7.5rem]' />

      <h1 className='mb-2 text-secondary-blue-900'>Forgot Password</h1>
      <p className='body-typo mb-10 text-secondary-shade'>
        No Worries, We’ll send you the reset instructions
      </p>

      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-y-10'
        >
          <div className='flex flex-col gap-1'>
            <FormLabel htmlFor='email'>
              Email Address
              <span className='text-error-700'> *</span>
            </FormLabel>
            <TextFormField
              control={form.control}
              name='email'
              placeholder='Ex. John.doe@gmail.com'
            />
          </div>
          <Button
            disabled={isPending}
            type='submit'
            variant='default'
            size='default'
            className='w-full'
          >
            Send Reset Email
          </Button>
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
export default ForgotPasswordForm;
