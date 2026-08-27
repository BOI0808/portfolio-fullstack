import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/admin"];
const PUBLIC_ADMIN_ROUTES = ["/admin/login"];
const TOKEN_COOKIE = "auth_token";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isPublicAdmin = PUBLIC_ADMIN_ROUTES.some((r) => pathname.startsWith(r));

  if (isPublicAdmin) return NextResponse.next();

  if (isProtected) {
    const token = request.cookies.get(TOKEN_COOKIE)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
