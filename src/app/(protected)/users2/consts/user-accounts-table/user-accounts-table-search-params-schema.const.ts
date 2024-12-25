import { DEFAULT_TABLE_SEARCH_PARAMS_SCHEMA } from '@/components/soli/table/consts/default-table-search-params-schema';
import { z } from 'zod';

export const USER_ACCOUNTS_TABLE_SEARCH_PARAMS_SCHEMA = z.intersection(
  z.object({
    name: z.string().optional(),
    email: z.string().optional(),
  }),
  DEFAULT_TABLE_SEARCH_PARAMS_SCHEMA
);
