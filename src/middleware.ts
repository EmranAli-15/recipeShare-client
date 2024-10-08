
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrentUser } from './services/auth/auth';

type role = keyof typeof roleBasedRoutes;

const authRoutes = ["/login", "/register"]

const roleBasedRoutes = {
    USER: [/^\/profile/],
    ADMIN: [/^\/admin/]
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const user = await getCurrentUser();
    
    if (!user) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    if (user?.role && roleBasedRoutes[user?.role as role]) {
        const routes = roleBasedRoutes[user?.role as role];
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL('/', request.url))
}


export const config = {
    matcher: ['/profile/:page*', '/login', '/register'],
}