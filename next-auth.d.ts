import { SoliUser } from '@/lib/soli/models/user/user.model';

declare module 'next-auth' {
  interface Session {
    user: SoliUser;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    user: AdapterUser & SoliUser;
    accessTokenExpires?: number;
  }
}
