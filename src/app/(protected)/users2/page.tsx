import { DEFAULT_TABLE_PER_PAGE_VALUE } from '@/components/soli/table/consts/default-table-per-page-value.const';
import { USER_ACCOUNTS_TABLE_SEARCH_PARAMS_SCHEMA } from './consts/user-accounts-table/user-accounts-table-search-params-schema.const';
import { UserAccountsTable } from './user-accounts-table/user-accounts-table';
import { getUserAccounts } from './utils/api/get-user-accounts';

type Users2PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Users2Page = async ({ searchParams }: Users2PageProps) => {
  const validatedParams =
    USER_ACCOUNTS_TABLE_SEARCH_PARAMS_SCHEMA.safeParse(searchParams);

  if (!validatedParams.success) {
    throw new Error(
      validatedParams.error.errors.map((error) => error.message).toString()
    );
  }

  const { page, per_page, name, sortBy, direction, email } =
    validatedParams.data;

  // PER PAGE - TODO: Might be handled from inside the table
  const _per_page =
    typeof per_page === 'number' ? per_page : DEFAULT_TABLE_PER_PAGE_VALUE;

  // PAGE NUMBER - TODO: Might be handled from inside the table
  const _page = typeof page === 'number' ? (page > 0 ? page : 1) : 1;

  const selectedName = typeof name === 'string' ? name : '';
  const selectedEmail = typeof email === 'string' ? email : '';

  const userAccountsData = await getUserAccounts({
    per_page: _per_page,
    column: sortBy,
    order: direction,
    selectedName,
    selectedEmail,
    page: _page,
  });

  return (
    <>
      <h1>User Accounts</h1>
      <div className='mx-auto mt-9 w-[70vw]'>
        <UserAccountsTable
          per_page={_per_page}
          page={_page}
          userAccountsData={userAccountsData}
        />
      </div>
    </>
  );
};
export default Users2Page;
