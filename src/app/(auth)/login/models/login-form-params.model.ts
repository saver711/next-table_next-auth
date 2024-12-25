import { z } from 'zod';
import { LOGIN_FORM_SCHEMA } from '../consts/login-form-schema.const';

export type LoginFormParams = z.infer<typeof LOGIN_FORM_SCHEMA>;
