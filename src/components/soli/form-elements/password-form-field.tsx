import { useState } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';

type PasswordFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  placeholder: string;
  wrapperClassName?: string;
  inputClassName?: string;
  required?: boolean;
};

export const PasswordFormField = <T extends FieldValues>({
  control,
  name,
  placeholder,
  wrapperClassName,
  inputClassName,
}: PasswordFormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col gap-2', wrapperClassName)}>
          <FormControl>
            <div className='relative'>
              <Input
                id={name}
                placeholder={placeholder}
                className={inputClassName}
                type={showPassword ? 'text' : 'password'}
                {...field}
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5'
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </FormControl>
          <FormMessage className='label2-typo text-error-700' />
        </FormItem>
      )}
    />
  );
};
