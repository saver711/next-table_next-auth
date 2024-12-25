import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { HTMLInputTypeAttribute } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

type TextFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  wrapperClassName?: string;
  inputClassName?: string;
};

export const TextFormField = <T extends FieldValues>({
  control,
  name,
  placeholder,
  type = 'text',
  wrapperClassName,
  inputClassName,
}: TextFormFieldProps<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col gap-2', wrapperClassName)}>
          <FormControl>
            <Input
              id={name}
              placeholder={placeholder}
              className={inputClassName}
              type={type}
              {...field}
            />
          </FormControl>
          <FormMessage className='label2-typo text-error-700' />
        </FormItem>
      )}
    />
  );
};
