import { useSession } from "next-auth/react";

/** A Hook for getting logged-in user within client components  */
export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};
