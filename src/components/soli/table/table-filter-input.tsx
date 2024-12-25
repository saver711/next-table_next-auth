import { DEBOUNCE_TIME } from '@/app/consts/api/debounce-time.const';
import { Input } from '@/components/ui/input';
import { useSearchQueryParams } from '@/lib/soli/hooks/ui/use-search-query-params';
import { debounce } from '@/lib/soli/utils/ui/debounce';
import { Table } from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';

type TableFilterInputProps<TData> = {
  table: Table<TData>;
  searchInputKey: string;
  placeholder: string;
};

export const TableFilterInput = <TData,>({
  table,
  searchInputKey,
  placeholder,
}: TableFilterInputProps<TData>) => {
  const searchParams = useSearchParams();
  const { set } = useSearchQueryParams(searchParams, {
    shouldUseRouter: true,
    deleteFalseValues: true,
  });

  const updateQueryParams = debounce((value: string) => {
    set({ name: value });
  }, DEBOUNCE_TIME);

  const inputDefaultValue = searchParams.get(searchInputKey) || '';

  return (
    <Input
      defaultValue={inputDefaultValue}
      placeholder={placeholder}
      onChange={(event) => {
        const value = event.target.value;
        updateQueryParams(value);
      }}
      className='max-w-sm'
    />
  );
};
