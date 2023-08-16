import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export const middleware =  (req: NextRequest) => {
  let cookie = req.cookies.get('access_token')?.value;
  if (Boolean(cookie)) {
    if (req.nextUrl.pathname.includes('/login') || req.nextUrl.pathname.includes('/signup')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else {
    if (req.nextUrl.pathname.includes('/create') || req.nextUrl.pathname.includes('/edit') || req.nextUrl.pathname.includes('/accountEdit')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
};

export const config = {
  matcher: ['/category/:path*, /accountEdit, /accountEdit/changeEmail, /login, /signup ']
};
