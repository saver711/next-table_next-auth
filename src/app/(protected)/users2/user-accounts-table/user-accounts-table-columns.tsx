/** NOTES
 * header property can be function that returns ReactNode
 * If u are going to use functions to define headers or cells u should mark the columns file as client
 *
 * */
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import { UserAccount } from '../models/user-account.model';

export const USER_ACCOUNTS_TABLE_COLUMNS: ColumnDef<UserAccount>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: '_id', header: '_id' },
  { accessorKey: 'name', header: 'Name' },
  {
    accessorKey: 'email',
    header: ({ column, header, table }) => {
      return (
        <Button
          className='flex w-full items-center gap-1'
          variant='transparent'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          <ArrowUpDown className='h-4 w-4' />
          Email
        </Button>
      );
    },
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row, table }) => {
      const userAccount = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='transparent' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreVertical className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={() =>
                navigator.clipboard
                  .writeText(userAccount._id.toString())
                  .then(() => {
                    toast.success(
                      `ID: ${userAccount._id} Copied Successfully!`
                    );
                  })
              }
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={() => {
                table.options.meta?.removeRow(row.index);
                table.resetRowSelection();
              }}
            >
              Delete row with id {userAccount._id}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
