import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  const isAssetRequest =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/public/") ||
    pathname.startsWith("/api");

  if (isAssetRequest) {
    return NextResponse.next();
  }

  // Public routes that do NOT require auth.login
  const publicRoutes = new Set(["/", "/auth/login", "/auth/register"]);

  // If user tries to access protected pages without token → redirect to auth.login
  if (!token && !publicRoutes.has(pathname)) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
