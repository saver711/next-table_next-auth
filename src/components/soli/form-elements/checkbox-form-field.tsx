import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

type CheckboxFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  id: string;
  className?: string;
  checkboxClassName?: string;
};

export const CheckboxFormField = <T extends FieldValues>({
  control,
  name,
  id,
  label,
  className,
  checkboxClassName,
}: CheckboxFormFieldProps<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col gap-2', className)}>
          <div className='flex items-center gap-1'>
            <FormControl>
              <Checkbox
                id={id}
                checked={field.value}
                onCheckedChange={field.onChange}
                className={cn(
                  {
                    'border-[1px] border-gray-400': !field.value,
                  },
                  checkboxClassName
                )}
              ></Checkbox>
            </FormControl>
            <FormLabel
              htmlFor={id}
              className='label1-typo cursor-pointer leading-none text-gray-900'
            >
              {label}
            </FormLabel>
          </div>
          <FormMessage className='label2-typo text-error-700' />
        </FormItem>
      )}
    />
  );
};
