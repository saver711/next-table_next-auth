import { z } from 'zod';
import { FORGOT_PASSWORD_FORM_SCHEMA } from '../consts/forgot-password-form-schema.const';

export type ForgotPasswordFormParams = z.infer<
  typeof FORGOT_PASSWORD_FORM_SCHEMA
>;
