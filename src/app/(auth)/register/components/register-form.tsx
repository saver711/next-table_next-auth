'use client';

import { LoginRegisterSwitch } from '@/auth/components/login-register-switch';
import { LoadingMsg } from '@/components/soli/alerts/loading-msg';
import { MobileNumberInput } from '@/components/soli/form-elements/mobile-number-input';
import { SelectFormField } from '@/components/soli/form-elements/select-form-field';
import { TextFormField } from '@/components/soli/form-elements/text-form-field';
import { SoliTextLogo } from '@/components/soli/ui/soli-text-logo';
import { UiBlocker } from '@/components/soli/ui/ui-blocker';
import { Button } from '@/components/ui/button';
import { Form, FormLabel } from '@/components/ui/form';
import { getInputPlaceholder } from '@/lib/soli/utils/forms/get-input-placeholder';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { toast } from 'sonner';
import { VERIFICATION_LINK_SENT_DESCRIPTION_TXT } from '../../consts/verification-link-sent-description-txt.const';
import { registerAction } from '../actions/register.action';
import { REGISTER_FORM_DEFAULT_VALUES } from '../consts/register-form-default-values.const';
import { REGISTER_FORM_SCHEMA } from '../consts/register-form-schema.const';
import { useGetCountries } from '../hooks/use-get-countries';
import { useGetCountryCities } from '../hooks/use-get-country-cities';
import { RegistrationFormParams } from '../models/register-form-params.model';
import { useServerAction } from 'zsa-react';

const RegisterForm = () => {
  // REGISTRATION FORM
  const form = useForm<RegistrationFormParams>({
    resolver: zodResolver(
      REGISTER_FORM_SCHEMA.superRefine(({ userPhone, dialCode }, ctx) => {
        if (!isPossiblePhoneNumber(userPhone) || !dialCode) {
          ctx.addIssue({
            code: 'custom',
            message: 'Phone number is not valid',
            path: ['userPhone'],
          });
        }
      })
    ),
    defaultValues: REGISTER_FORM_DEFAULT_VALUES,
  });

  // REGISTER ACTION
  const { execute, isPending, isSuccess } = useServerAction(registerAction, {
    onError: ({ err }) => {
      const description = err.message;
      toast.error('Error', { description });
    },
  });

  // COUNTRIES
  const {
    data: countriesData,
    isLoading: countriesIsLoading,
    error: countriesError,
  } = useGetCountries({
    onError: (error) => {
      toast.error('Error', { description: error.info });
    },
  });
  const countriesOptions = countriesData?.map(({ name, id }) => ({
    label: name,
    value: id.toString(),
  }));

  // CITIES
  const countryId = form.watch('countryId');
  const {
    data: citiesData,
    isLoading: citiesIsLoading,
    error: citiesError,
  } = useGetCountryCities(countryId, {
    onError: (error) => {
      toast.error('Error', { description: error.info });
    },
  });
  const citiesOptions = citiesData?.map(({ name, id }) => ({
    label: name,
    value: id.toString(),
  }));

  useEffect(() => {
    form.resetField('cityId');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId]);

  const areSomeInputsFilled = form.formState.isDirty;
  const onSubmit = (data: RegistrationFormParams) => {
    execute(data);
  };

  return (
    <>
      {/* REGISTERED SUCCESSFULLY */}
      {isSuccess && (
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

      {/* THE FORM */}
      {!isSuccess && (
        <>
          <SoliTextLogo className={cn('mb-16 mt-10')} />
          <h1 className='heading-1 mb-[0.625rem] hidden text-secondary-blue-900 sm:block'>
            Register Your Company
          </h1>
          <h2 className='mb-[0.625rem] text-secondary-blue-900 sm:hidden'>
            Register Your Company
          </h2>
          <p className='body mb-10 text-secondary-shade'>
            Please tell us more about your company
          </p>
          <LoginRegisterSwitch areSomeInputsFilled={areSomeInputsFilled} />

          <FormProvider {...form}>
            <Form {...form}>
              <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-y-4 pt-10'
              >
                <div className='flex flex-col gap-1'>
                  <FormLabel htmlFor='email'>
                    Email
                    <span className='text-error-700'> *</span>
                  </FormLabel>
                  <TextFormField
                    control={form.control}
                    name='email'
                    placeholder='Ex. John.doe@gmail.com'
                  />
                </div>

                <div className='flex gap-x-4'>
                  <div className='flex grow flex-col gap-1'>
                    <FormLabel htmlFor='firstName'>
                      First Name
                      <span className='text-error-700'> *</span>
                    </FormLabel>
                    <TextFormField
                      control={form.control}
                      name='firstName'
                      placeholder='Ex. John'
                    />
                  </div>
                  <div className='flex grow flex-col gap-1'>
                    <FormLabel htmlFor='lastName'>
                      Last Name
                      <span className='text-error-700'> *</span>
                    </FormLabel>
                    <TextFormField
                      control={form.control}
                      name='lastName'
                      placeholder='Ex.  Doe'
                    />
                  </div>
                </div>

                <div className='flex flex-col gap-1'>
                  <FormLabel htmlFor='phone'>
                    User Mobile Number
                    <span className='text-error-700'> *</span>
                  </FormLabel>
                  <MobileNumberInput<RegistrationFormParams>
                    callingCodeFormControlName='dialCode'
                    control={form.control}
                    name='userPhone'
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <FormLabel htmlFor='companyName'>
                    Company Name
                    <span className='text-error-700'> *</span>
                  </FormLabel>
                  <TextFormField
                    control={form.control}
                    name='companyName'
                    placeholder='Ex. Anonymous Company'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <FormLabel htmlFor='companyAddress'>
                    Company Address
                    <span className='text-error-700'> *</span>
                  </FormLabel>
                  <TextFormField
                    control={form.control}
                    name='companyAddress'
                    placeholder='Ex. Loreum Ipsum'
                  />
                </div>
                <div className='flex gap-x-4'>
                  <div className='flex grow flex-col gap-1'>
                    <FormLabel htmlFor='country'>
                      Country
                      <span className='text-error-700'> *</span>
                    </FormLabel>
                    <SelectFormField
                      disabled={
                        countriesIsLoading ||
                        !!countriesError ||
                        !countriesOptions?.length
                      }
                      placeholder={getInputPlaceholder(
                        'Select Country',
                        countriesIsLoading,
                        !!countriesError
                      )}
                      control={form.control}
                      name='countryId'
                      options={countriesOptions || []}
                    />
                  </div>
                  <div className='flex grow flex-col gap-1'>
                    <FormLabel htmlFor='city'>
                      City
                      <span className='text-error-700'> *</span>
                    </FormLabel>
                    <SelectFormField
                      control={form.control}
                      name='cityId'
                      options={citiesOptions || []}
                      disabled={
                        citiesIsLoading ||
                        !!citiesError ||
                        !citiesOptions?.length
                      }
                      placeholder={
                        !countryId
                          ? 'Select country first'
                          : getInputPlaceholder(
                              'Select City',
                              citiesIsLoading,
                              !!citiesError
                            )
                      }
                    />
                  </div>
                </div>
                <Button
                  disabled={isPending}
                  type='submit'
                  variant='default'
                  size='default'
                  className='my-2 w-full'
                >
                  Register
                </Button>
                {isPending && (
                  <LoadingMsg loadingMsg='Loading, please wait...' />
                )}
              </form>
            </Form>
          </FormProvider>
        </>
      )}
    </>
  );
};
export default RegisterForm;
