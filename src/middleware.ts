import { NextRequest, NextResponse } from 'next/server';
export function middleware(r: NextRequest) {
    const token = r.cookies.get('invenflow_token')?.value;
    const login = r.nextUrl.pathname.startsWith('/login');
    if (!token && !login) return NextResponse.redirect(new URL('/login', r.url));
    if (token && login) return NextResponse.redirect(new URL('/dashboard', r.url));
    return NextResponse.next();
}
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/inventory/:path*',
        '/purchase-request/:path*',
        '/approval/:path*',
        '/suppliers/:path*',
        '/quotations/:path*',
        '/purchase-orders/:path*',
        '/goods-receipt/:path*',
        '/invoices/:path*',
        '/payments/:path*',
        '/reports/:path*',
        '/login',
    ],
};
