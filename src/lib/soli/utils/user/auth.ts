import { LOGIN_FORM_SCHEMA } from '@/app/(auth)/login/consts/login-form-schema.const';
import { CustomAuthError } from '@/app/(auth)/utils/custom-auth-error.util';
import { API_URL } from '@/lib/soli/consts/envs.const';
import { getErrorMessage } from '@/lib/soli/utils/api/get-error-message';
import { jwtDecode } from 'jwt-decode';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { SoliUser } from '../../models/user/user.model';
import { refreshAccessToken } from './refresh-access-token';
export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const credentialsData = {
          ...credentials,
        };

        const validatedFields = LOGIN_FORM_SCHEMA.safeParse(credentialsData);
        if (!validatedFields.success) {
          throw new CustomAuthError('Invalid Fields');
        }
        const { email, password } = validatedFields.data;
        console.log(`🚀 ~ authorize: ~ email:`, email);

        const body = JSON.stringify({
          email,
          password,
        });

        const response = await fetch(`${API_URL}login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        });

        // const data: SoliBEResponse<SoliUser> = await response.json();
        const data: SoliUser = await response.json();
        if (response.ok && data.accessToken) {
          return data;
          // return data.data;
        } else {
          const errorMessage = getErrorMessage(data);
          throw new CustomAuthError(errorMessage);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, session, trigger }) => {
      if (user) {
        token.user = user;
      }
      if (trigger === 'update') {
        token.user = session.user;
      }

      if (token.user.accessToken) {
        const decodedToken = jwtDecode(token.user.accessToken);
        if (decodedToken.exp) {
          token.accessTokenExpires = decodedToken.exp * 1000;
        }
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        // NOT EXPIRED
        return token;
      }

      // EXPIRED

      return refreshAccessToken(token);
    },
    session({ session, token }) {
      if (token.user) session.user = token.user;
      return session;
    },
  },
});
