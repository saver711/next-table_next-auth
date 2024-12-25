import { z } from 'zod';

export const FORGOT_PASSWORD_FORM_SCHEMA = z.object({
  email: z.string().email(),
});
