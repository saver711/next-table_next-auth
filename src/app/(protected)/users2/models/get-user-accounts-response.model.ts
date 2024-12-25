import { UserAccount } from './user-account.model';

export type GetUserAccountsResponse = {
  users: UserAccount[];
  items: number;
  pages: number;
};
