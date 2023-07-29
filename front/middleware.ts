import customApi from "@utils/customApi";
import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  let cookie = req.cookies.get('jwt')?.value
  console.log("{cookie}",{cookie})
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|static).*)"],
};
