import { z } from 'zod';

export const LOGIN_FORM_SCHEMA = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Required field!' }),
  remembered: z.boolean().optional(),
});
