'use server';
import { API_URL } from '@/lib/soli/consts/envs.const';
import { getErrorMessage } from '@/lib/soli/utils/api/get-error-message';
import { z } from 'zod';
import { createServerAction } from 'zsa';

const requestToken = async (data: { token: string }) => {
  const body = JSON.stringify(data);
  const response = await fetch(`${API_URL}api/auth/resend-activation-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  const responseData = await response.json();
  if (!response.ok) {
    const errorMsg = getErrorMessage(responseData);
    throw errorMsg;
  }
};
const VALIDATE_TOKEN_SCHEMA = z.object({
  token: z.string(),
});

export const requestTokenAction = createServerAction()
  .input(VALIDATE_TOKEN_SCHEMA)
  .handler(async ({ input }) => {
    await requestToken(input);
  });
