import { ERROR_FALLBACK } from '@/app/consts/api/error-fallback.const';
import { SortDirection } from '@/components/soli/table/models/sort-direction.enum';
import { soliAuthFetch } from '@/lib/soli/utils/api/soli-auth-fetch';
import withQuery from 'with-query';
import { GetUserAccountsResponse } from '../../models/get-user-accounts-response.model';
import { UserAccount } from '../../models/user-account.model';
import { API_URL } from '@/lib/soli/consts/envs.const';
import { getErrorMessage } from '@/lib/soli/utils/api/get-error-message';

export type getUserAccountsProps = {
  per_page: number;
  column: keyof UserAccount | undefined;
  order: SortDirection | undefined;
  selectedName: string | undefined;
  selectedEmail: string | undefined;
  page: number;
};

export const getUserAccounts = async ({
  column,
  order,
  per_page,
  selectedName,
  page,
  selectedEmail,
}: getUserAccountsProps): Promise<GetUserAccountsResponse> => {
  let DEFAULT_URL = API_URL + 'users';
  const URL = withQuery(DEFAULT_URL, {
    ...(selectedName && { name: selectedName }),
    ...(selectedEmail && { email: selectedEmail }),
    page,
    per_page,
    sortBy: column,
    sortDirection: order,
  });

  // console.log(soliXior.defaults.headers['Authorization']);

  // const { response, data } = await soliXior.get<GetUserAccountsResponse>(URL);
  const response = await soliAuthFetch(URL);
  const data = await response.json();
  // const response = await fetch(URL);

  if (!response.ok) {
    const error = getErrorMessage(data);
    throw new Error(error);
  }

  return data;
  // return response.json();
};
