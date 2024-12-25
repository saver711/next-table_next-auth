import {
  AUTH_ROUTES,
  DEFAULT_REDIRECT_ROUTE,
  PUBLIC_ROUTES,
} from '@/app/(auth)/consts/auth-routes.const';
import { auth } from '@/auth-utils';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isAuthRoute && !nextUrl.pathname.startsWith('/api')) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT_ROUTE, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute && !nextUrl.pathname.startsWith('/api')) {
    return Response.redirect(new URL('/login', nextUrl));
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
