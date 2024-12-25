import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { SelectOption } from '@/lib/soli/models/select-option.model';

type selectFormFieldProps<T extends FieldValues> = {
  options: SelectOption[];
  control: Control<T>;
  name: FieldPath<T>;
  wrapperClassName?: string;
  placeholder?: string;
  disabled?: boolean;
};

export const SelectFormField = <T extends FieldValues>({
  control,
  name,
  wrapperClassName,
  options,
  placeholder,
  disabled = false,
}: selectFormFieldProps<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <FormItem className={cn('flex flex-col gap-2', wrapperClassName)}>
          <Select disabled={disabled} onValueChange={onChange} value={value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage className='label2-typo text-error-700' />
        </FormItem>
      )}
    />
  );
};
