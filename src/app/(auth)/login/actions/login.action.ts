'use server';
import { signIn } from '@/auth-utils';
import { LOGIN_FORM_SCHEMA } from '../consts/login-form-schema.const';
import { createServerAction } from 'zsa';

export const login = createServerAction()
  .input(LOGIN_FORM_SCHEMA)
  .handler(async ({ input: { email, password } }) => {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  });
