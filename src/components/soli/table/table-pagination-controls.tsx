// TODO: To be deleted if not used
import { Button } from '@/components/ui/button';
import { Table } from '@tanstack/react-table';
type TablePaginationControlsProps<TData> = {
  table: Table<TData>;
};

export const TablePaginationControls = <TData,>({
  table,
}: TablePaginationControlsProps<TData>) => {
  return (
    <div className='flex items-center justify-end space-x-2 py-4'>
      <Button
        variant='outline'
        size='sm'
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant='outline'
        size='sm'
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  );
};
