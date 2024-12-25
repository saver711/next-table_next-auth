import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

type MobileNumberInputParams<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  callingCodeFormControlName: FieldPath<T>;
};
export const MobileNumberInput = <T extends FieldValues>({
  control,
  name,
  callingCodeFormControlName,
}: MobileNumberInputParams<T>) => {
  const form = useFormContext();
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem className='flex flex-col gap-2'>
            <FormControl>
              <PhoneInput
                countryCallingCodeEditable={false}
                international
                className='[&>.PhoneInputCountry]:bg-white [&>.PhoneInputCountry]:px-4'
                inputComponent={Input}
                onCountryChange={(country) => {
                  if (country) {
                    const callingCode = getCountryCallingCode(country);
                    form.setValue(
                      callingCodeFormControlName,
                      callingCode as any
                    );
                  }
                }}
                defaultCountry='EG'
                placeholder='Enter phone number'
                {...field}
              />
            </FormControl>
            <FormMessage className='label2-typo text-error-700' />
          </FormItem>
        );
      }}
    />
  );
};
