
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrentUser } from './services/auth/auth';


const authRoutes = ["/login", "/register"];
const userRoutes = ["/profile/addItem"]


export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log(pathname);


    const user = await getCurrentUser();

    if (!user) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    if (user?.role && user.role === "user") {
        const match = userRoutes.find(path => path == pathname);
        if (match) {
            return NextResponse.next()
        }
    }

    return NextResponse.redirect(new URL('/', request.url))
}


export const config = {
    matcher: ['/profile/:page*', '/login', '/register'],
}