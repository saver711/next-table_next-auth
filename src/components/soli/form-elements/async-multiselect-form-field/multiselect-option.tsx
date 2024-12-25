import { SelectOption } from '@/lib/soli/models/select-option.model';
import { GroupBase, OptionProps, components } from 'react-select';

export const MultiselectOption = (
  props: OptionProps<SelectOption, true, GroupBase<SelectOption>>
) => {
  return (
    <div>
      <components.Option {...props}>
        <div className='flex items-center'>
          <input
            key={props.data.value}
            checked={props.isSelected}
            onChange={(e) => null}
            id={props.data.value}
            type='checkbox'
            className='h-5 w-5 rounded border-gray-300 bg-primary-700 text-primary-700 accent-primary-700 checked:ring-2 checked:ring-primary-800 focus:ring-2 focus:ring-primary-800'
          />
          <label
            htmlFor={props.data.value}
            className='ms-2 text-sm font-medium text-gray-900'
          >
            {props.label}
          </label>
        </div>
      </components.Option>
    </div>
  );
};
