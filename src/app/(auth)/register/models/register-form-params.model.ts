import { z } from 'zod';
import { REGISTER_FORM_SCHEMA } from '../consts/register-form-schema.const';

export type RegistrationFormParams = z.infer<typeof REGISTER_FORM_SCHEMA>;
