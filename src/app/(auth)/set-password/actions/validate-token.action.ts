'use server';
import { API_URL } from '@/lib/soli/consts/envs.const';
import { ErrorCode } from '@/lib/soli/models/api/error-code.enum';
import { getErrorMessage } from '@/lib/soli/utils/api/get-error-message';
import { z } from 'zod';
import { createServerAction, ZSAError } from 'zsa';

const validateToken = async (token: string) => {
  const response = await fetch(`${API_URL}api/auth/verify?token=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    if (data.message === ErrorCode.API_TOKEN_INVALID) {
      throw ErrorCode.API_TOKEN_INVALID;
    }
    const errorMsg = getErrorMessage(data);
    throw errorMsg;
  }
};
const VALIDATE_TOKEN_SCHEMA = z.object({
  token: z.string(),
});

export const validateTokenAction = createServerAction()
  .input(VALIDATE_TOKEN_SCHEMA)
  .handler(async ({ input }) => {
    await validateToken(input.token);
  });
