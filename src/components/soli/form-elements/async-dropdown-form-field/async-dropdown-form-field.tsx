import { DEBOUNCE_TIME } from '@/app/consts/api/debounce-time.const';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { SelectOption } from '@/lib/soli/models/select-option.model';
import { cn } from '@/lib/utils';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { GroupBase, OptionsOrGroups } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';

type AsyncDropdownFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  placeholder: string;
  wrapperClassName?: string;
  selectClassName?: string;
  loadOptions: (
    search?: string,
    prevOptions?: OptionsOrGroups<SelectOption, GroupBase<SelectOption>>
  ) => Promise<{
    options: SelectOption[];
    hasMore: boolean;
  }>;
};

export const AsyncDropdownFormField = <T extends FieldValues>({
  control,
  name,
  placeholder,
  wrapperClassName,
  selectClassName,
  loadOptions,
}: AsyncDropdownFormFieldProps<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field: { value, onChange, ref } }) => (
        <FormItem className={cn('flex flex-col gap-2', wrapperClassName)}>
          <FormControl>
            <AsyncPaginate
              placeholder={placeholder}
              className={selectClassName}
              backspaceRemovesValue={false}
              blurInputOnSelect={false}
              escapeClearsValue={false}
              inputId={name}
              classNames={{
                control: (state) =>
                  state.menuIsOpen
                    ? '!shadow-input !border-0'
                    : '' || state.isFocused
                      ? '!shadow-none !border-0'
                      : '',
                option: (state) =>
                  state.isSelected
                    ? '!bg-primary-900'
                    : 'hover:!bg-gray-500' && state.isFocused
                      ? '!bg-gray-500'
                      : 'hover:!bg-gray-500',
                valueContainer: () => (2 ? `[&>[data-value]]:max-w-max` : ''),
              }}
              closeMenuOnSelect={false}
              isClearable
              value={value.value}
              loadOptions={loadOptions}
              onChange={(option) =>
                onChange((option as SelectOption | null)?.value)
              }
              selectRef={ref}
              debounceTimeout={DEBOUNCE_TIME}
              hideSelectedOptions={false}
              //   TODO: Based on BE pagination, We might need to change this
              reduceOptions={(prevOptions, newOptions) => newOptions}
            />
          </FormControl>
          <FormMessage className='label2-typo text-error-700' />
        </FormItem>
      )}
    />
  );
};
