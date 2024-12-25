'use client';
import { ForgotPasswordFormParams } from '@/app/(auth)/forgot-password/models/forgot-password-form-params.model';
import { TextFormField } from '@/components/soli/form-elements/text-form-field';
import { DataTable } from '@/components/soli/table/data-table';
import { useDataTable } from '@/components/soli/table/hooks/use-data-table';
import { Button } from '@/components/ui/button';
import { Form, FormLabel } from '@/components/ui/form';
import { useSearchQueryParams } from '@/lib/soli/hooks/ui/use-search-query-params';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { GetUserAccountsResponse } from '../models/get-user-accounts-response.model';
import { USER_ACCOUNTS_TABLE_COLUMNS } from './user-accounts-table-columns';

type UserAccountsTableProps = {
  userAccountsData: GetUserAccountsResponse;
  per_page: number;
  page: number;
};

export const UserAccountsTable = ({
  userAccountsData,
  page,
  per_page,
}: UserAccountsTableProps) => {
  const { users, items, pages } = userAccountsData;
  const { table } = useDataTable({
    data: users,
    columns: USER_ACCOUNTS_TABLE_COLUMNS,
    pageCount: pages,
    initialState: {
      // sorting: [{ id: 'name', desc: false }],
      pagination: {
        pageIndex: page <= pages ? page - 1 : pages - 1,
        pageSize: per_page,
      },
      columnPinning: { right: ['actions'] },
    },

    // For remembering the previous row selection on page change
    // getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
  });
  const searchParams = useSearchParams();
  const { set } = useSearchQueryParams(searchParams, {
    shouldUseRouter: true,
    deleteFalseValues: true,
  });

  const form = useForm<{ email: string }>({
    // resolver: zodResolver(FORGOT_PASSWORD_FORM_SCHEMA),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: ForgotPasswordFormParams) => {
    set({ email: data.email });
  };

  return (
    <>
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-y-10'
        >
          <div className='flex flex-col gap-1'>
            <FormLabel htmlFor='email'>
              Email Address
              <span className='text-error-700'> *</span>
            </FormLabel>
            <TextFormField
              control={form.control}
              name='email'
              placeholder='Ex. John.doe@gmail.com'
            />
          </div>
          <Button
            id='reset-email-btn'
            type='submit'
            variant='default'
            size='default'
            className='w-full'
          >
            Set Email
          </Button>
        </form>
      </Form>
      <DataTable
        searchInputKey='name'
        searchInputPlaceholder='Filter by name...'
        table={table}
      />
    </>
  );
};
