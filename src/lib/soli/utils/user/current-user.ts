import { auth } from '@/auth-utils';

/** Get logged-in user within server components  */
export const getCurrentUser = async () => {
  const session = await auth();

  return session?.user;
};
