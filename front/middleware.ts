import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  let cookie = req.cookies.get('access_token')?.value;
  if (Boolean(cookie)) {
    if (req.url.includes('/login') || req.url.includes('/signup')) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    if (req.url.includes('/create') || req.url.includes('/edit') || req.url.includes('/accountEdit')) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|static).*)"],
};