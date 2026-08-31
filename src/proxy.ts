import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const hasSession = !!(accessToken || refreshToken);
  const { pathname } = req.nextUrl;

  const authRoutes = ["/auth/login", "/auth/forgot-password", "/auth/reset-password"];

  const isAuthRoute = authRoutes.includes(pathname);

  if (hasSession && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!hasSession && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};