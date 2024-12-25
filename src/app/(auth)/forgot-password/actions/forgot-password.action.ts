'use server';
import { API_URL } from '@/lib/soli/consts/envs.const';
import { getErrorMessage } from '@/lib/soli/utils/api/get-error-message';
import { FORGOT_PASSWORD_FORM_SCHEMA } from '../consts/forgot-password-form-schema.const';
import { ForgotPasswordFormParams } from '../models/forgot-password-form-params.model';
import { createServerAction } from 'zsa';

const forgotPassword = async ({ email }: ForgotPasswordFormParams) => {
  const response = await fetch(
    `${API_URL}api/auth/reset-password?email=${email}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const data = await response.json();
    const errorMsg = getErrorMessage(data);
    throw errorMsg;
  }
};

export const forgotPasswordAction = createServerAction()
  .input(FORGOT_PASSWORD_FORM_SCHEMA)
  .handler(async ({ input }) => {
    await forgotPassword(input);
  });
