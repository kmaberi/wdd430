import { auth } from '@/auth';

export default auth((req) => {
    const isAuth = !!req.auth;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login');
    const isApiAuthRoute = req.nextUrl.pathname.startsWith('/api/auth');

    if (isApiAuthRoute) {
        return;
    }

    if (isAuthPage) {
        if (isAuth) {
            return Response.redirect(new URL('/dashboard', req.nextUrl));
        }
        return;
    }

    if (!isAuth) {
        // Allow dashboard to be viewed without sign-in for this deployment fix.
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
            return;
        }

        let from = req.nextUrl.pathname;
        if (req.nextUrl.search) {
            from += req.nextUrl.search;
        }

        return Response.redirect(
            new URL(`/login?from=${encodeURIComponent(from)}`, req.nextUrl)
        );
    }
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};