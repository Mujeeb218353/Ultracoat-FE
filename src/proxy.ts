import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  const authRoutes = ["/auth/login", "/auth/forgot-password", "/auth/reset-password"];

  const isAuthRoute = authRoutes.includes(pathname);

  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!accessToken && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};