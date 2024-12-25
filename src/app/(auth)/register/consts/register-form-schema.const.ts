import { z } from 'zod';

export const REGISTER_FORM_SCHEMA = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, { message: 'Required field!' }),
  lastName: z.string().min(1, { message: 'Required field!' }),
  companyName: z.string().min(1, { message: 'Required field!' }),
  companyAddress: z.string().min(1, { message: 'Required field!' }),
  countryId: z.string().min(1, { message: 'Required field!' }),
  cityId: z.string().min(1, { message: 'Required field!' }),
  dialCode: z.string().min(1, { message: 'Required field!' }),
  userPhone: z.string().min(1, { message: 'Required field!' }),
});
