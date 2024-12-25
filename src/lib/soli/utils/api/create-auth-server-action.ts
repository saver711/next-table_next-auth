import { getCurrentUser } from '../user/current-user';
import { createServerActionProcedure } from 'zsa';

export const createAuthServerAction = createServerActionProcedure()
  .handler(async () => {
    const user = await getCurrentUser();
    if (!user) {
      throw 'No valid session';
    }

    return user;
  })
  .createServerAction();
