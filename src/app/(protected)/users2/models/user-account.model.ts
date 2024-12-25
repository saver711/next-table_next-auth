export const USER_ACCOUNT_FIELDS = {
  _id: 'id',
  name: 'name',
  email: 'email',
} as const;

export type UserAccount = typeof USER_ACCOUNT_FIELDS;
