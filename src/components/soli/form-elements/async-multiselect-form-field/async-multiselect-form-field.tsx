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
import { GroupBase, OptionsOrGroups, StylesConfig } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import { MultiselectChips } from './multiselect-chips';
import { MultiselectOption } from './multiselect-option';

type AsyncMultiselectFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  placeholder: string;
  wrapperClassName?: string;
  selectClassName?: string;
  maxChipsCount?: number;
  loadOptions: (
    search?: string,
    prevOptions?: OptionsOrGroups<SelectOption, GroupBase<SelectOption>>
  ) => Promise<{
    options: SelectOption[];
    hasMore: boolean;
  }>;
};

export const AsyncMultiselectFormField = <T extends FieldValues>({
  control,
  name,
  placeholder,
  wrapperClassName,
  selectClassName,
  maxChipsCount = 2,
  loadOptions,
}: AsyncMultiselectFormFieldProps<T>) => {
  const customStyles: StylesConfig<SelectOption, true> = {
    multiValue: (provided, state) => {
      const index = state.index || 0;
      if (index >= maxChipsCount) {
        return { ...provided, display: 'none' };
      }
      return provided;
    },
  };
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
              styles={customStyles}
              isMulti={true}
              isClearable
              value={value}
              loadOptions={loadOptions}
              onChange={onChange}
              selectRef={ref}
              debounceTimeout={DEBOUNCE_TIME}
              hideSelectedOptions={false}
              //   TODO: Based on BE pagination, We might need to change this
              reduceOptions={(prevOptions, newOptions) => newOptions}
              components={{
                ValueContainer: (valueContainerProps) => (
                  <MultiselectChips
                    {...valueContainerProps}
                    maxChipsToShow={maxChipsCount}
                  />
                ),
                Option: MultiselectOption,
              }}
            />
          </FormControl>
          <FormMessage className='label2-typo text-error-700' />
        </FormItem>
      )}
    />
  );
};
