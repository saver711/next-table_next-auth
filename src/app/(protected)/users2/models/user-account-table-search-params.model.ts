import { z } from 'zod';
import { USER_ACCOUNTS_TABLE_SEARCH_PARAMS_SCHEMA } from '../consts/user-accounts-table/user-accounts-table-search-params-schema.const';

export type UserAccountTableSearchParams = z.infer<
  typeof USER_ACCOUNTS_TABLE_SEARCH_PARAMS_SCHEMA
>;
