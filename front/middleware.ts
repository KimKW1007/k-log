import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  let cookie = req.cookies.get('access_token')?.value;
  if (Boolean(cookie)) {
    if (req.nextUrl.pathname.includes('/login') || req.nextUrl.pathname.includes('/signup')) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    if (req.nextUrl.pathname.includes('/create') || req.nextUrl.pathname.includes('/edit') || req.nextUrl.pathname.includes('/accountEdit')) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|static).*)"],
};