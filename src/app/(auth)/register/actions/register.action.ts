'use server';
import { API_URL } from '@/lib/soli/consts/envs.const';
import { getErrorMessage } from '@/lib/soli/utils/api/get-error-message';
import { REGISTER_FORM_SCHEMA } from '../consts/register-form-schema.const';
import { RegistrationFormParams } from '../models/register-form-params.model';
import { createServerAction } from 'zsa';

const registerCompany = async (parsedInput: RegistrationFormParams) => {
  const body = JSON.stringify(parsedInput);
  const response = await fetch(`${API_URL}v1/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = getErrorMessage(data);
    throw errorMsg;
  }
};

export const registerAction = createServerAction()
  .input(REGISTER_FORM_SCHEMA)
  .handler(async ({ input }) => {
    await registerCompany(input);
  });
