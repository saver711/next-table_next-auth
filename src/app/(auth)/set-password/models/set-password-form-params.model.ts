import { z } from 'zod';
import { SET_PASSWORD_FORM_SCHEMA } from '../consts/set-password-form-schema.const';

export type SetPasswordFormParams = z.infer<typeof SET_PASSWORD_FORM_SCHEMA>;
