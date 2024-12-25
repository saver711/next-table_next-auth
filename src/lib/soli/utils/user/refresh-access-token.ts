import { JWT } from '@auth/core/jwt';
import { API_URL } from '../../consts/envs.const';
import { getErrorMessage } from '../api/get-error-message';

export const refreshAccessToken = async (token: JWT) => {
  const res = await fetch(`${API_URL}refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken: token.user.refreshToken }),
  });

  const data = await res.json();

  // Check for response errors
  if (!res.ok) {
    const error = getErrorMessage(data);
    throw new Error(error);
  }

  if (data.accessToken) {
    token.user.accessToken = data.accessToken;
  }
  console.log('✅ TOKEN REFRESHED');

  return token;
};
