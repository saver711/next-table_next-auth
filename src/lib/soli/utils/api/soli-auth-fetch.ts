import { auth } from '../user/auth';

export const soliAuthFetch = async (
  url: string | URL | globalThis.Request,
  options?: RequestInit
) => {
  const session = await auth();
  const token = session?.user.accessToken;

  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};
