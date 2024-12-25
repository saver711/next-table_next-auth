// TODO: Change component name if used
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Table } from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { getRowsPerPageOptions } from './utils/get-rows-per-page-options';

type AdvancedTablePaginationControlsProps<TData> = {
  table: Table<TData>;
};

export function AdvancedTablePaginationControls<TData>({
  table,
}: AdvancedTablePaginationControlsProps<TData>) {
  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  const perPageOptions = getRowsPerPageOptions(
    table.getState().pagination.pageSize
  );

  return (
    <div className='flex items-center justify-between px-2'>
      <div className='text-muted-foreground flex-1 text-sm'>
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {perPageOptions.map((pageSize) => (
                <SelectItem
                  className='cursor-pointer'
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Page{' '}
          {pageIndex + 1 > table.getPageCount()
            ? table.getPageCount()
            : pageIndex + 1}{' '}
          of {table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>
          {/* <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => table.setPageIndex(0)}
            disabled={!canPreviousPage || pageIndex + 1 > table.getPageCount()}
          >
            <span className='sr-only'>Go to first page</span>
            <ArrowLeftCircleIcon className='h-4 w-4' />
          </Button> */}
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => table.previousPage()}
            disabled={!canPreviousPage || pageIndex + 1 > table.getPageCount()}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => table.nextPage()}
            disabled={!canNextPage}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          {/* <Button
            variant='outline'
            className='hidden p-3 lg:flex'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!canNextPage}
          >
            <span className='sr-only'>Go to last page</span>
            <ArrowRightCircleIcon className='h-4 w-4' />
          </Button> */}
        </div>
      </div>
    </div>
  );
}
