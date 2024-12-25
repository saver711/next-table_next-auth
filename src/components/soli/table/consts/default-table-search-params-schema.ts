import {
  USER_ACCOUNT_FIELDS,
  UserAccount,
} from '@/app/(protected)/users2/models/user-account.model';
import { z } from 'zod';
import { SortDirection } from '../models/sort-direction.enum';
import { DEFAULT_TABLE_PER_PAGE_VALUE } from './default-table-per-page-value.const';

export const DEFAULT_TABLE_SEARCH_PARAMS_SCHEMA = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().optional().default(DEFAULT_TABLE_PER_PAGE_VALUE),
  sortBy: z
    .enum(
      Object.keys(USER_ACCOUNT_FIELDS) as [
        keyof UserAccount,
        ...Array<keyof UserAccount>,
      ]
    )
    .optional(),
  direction: z.enum([SortDirection.ASC, SortDirection.DESC]).optional(),
});
