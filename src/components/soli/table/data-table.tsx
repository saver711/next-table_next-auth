'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { flexRender, Table as TableModel } from '@tanstack/react-table';
import { AdvancedTablePaginationControls } from './advanced-table-pagination-controls';
import { TableFilterInput } from './table-filter-input';
import { TableShowHideColumns } from './table-show-hide-columns';

type DataTableProps<TData, TValue> = {
  table: TableModel<TData>;
  searchInputKey: string;
  searchInputPlaceholder: string;
};

export function DataTable<TData, TValue>({
  table,
  searchInputKey,
  searchInputPlaceholder,
}: DataTableProps<TData, TValue>) {
  return (
    <div>
      <div className='flex items-center py-4'>
        <TableFilterInput
          placeholder={searchInputPlaceholder}
          searchInputKey={searchInputKey}
          table={table}
        />
        <TableShowHideColumns table={table} />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // EMPTY
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AdvancedTablePaginationControls table={table} />
    </div>
  );
}
