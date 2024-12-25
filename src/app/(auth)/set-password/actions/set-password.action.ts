'use server';
import { API_URL } from '@/lib/soli/consts/envs.const';
import { getErrorMessage } from '@/lib/soli/utils/api/get-error-message';
import { SET_PASSWORD_FORM_SCHEMA } from '../consts/set-password-form-schema.const';
import { SetPasswordFormParams } from '../models/set-password-form-params.model';
import { createServerAction } from 'zsa';

const setPassword = async (parsedInput: SetPasswordFormParams) => {
  const { confirmPassword, token, ...data } = parsedInput;
  const body = JSON.stringify(data);
  const response = await fetch(
    `${API_URL}api/auth/password-setup?token=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }
  );

  const responseData = await response.json();
  if (!response.ok) {
    const errorMsg = getErrorMessage(responseData);
    errorMsg;
  }
};

export const setPasswordAction = createServerAction()
  .input(SET_PASSWORD_FORM_SCHEMA)
  .handler(async ({ input }) => {
    await setPassword(input);
  });
