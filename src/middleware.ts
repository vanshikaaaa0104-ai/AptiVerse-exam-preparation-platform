import { NextResponse, type NextRequest } from "next/server";
import {
  verifySessionToken,
  SESSION_COOKIE_NAME,
  ALT_SESSION_COOKIE_NAME,
} from "@/lib/session";

// Routes that require an active authenticated session
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/learn",
  "/practice",
  "/quiz",
  "/mocks",
  "/analytics",
  "/mistakes",
  "/study-plan",
  "/profile",
  "/settings",
  "/bookmarks",
  "/leaderboard",
  "/achievements",
  "/onboarding",
  "/admin",
];

// Auth routes where already-logged-in users can be redirected to /dashboard
const AUTH_ROUTES = ["/sign-in", "/login", "/sign-up", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Ignore static assets, next internal files, and favicon
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname === "/favicon.ico" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get(SESSION_COOKIE_NAME)?.value ||
    request.cookies.get(ALT_SESSION_COOKIE_NAME)?.value;

  const session = token ? await verifySessionToken(token) : null;
  const isAuthenticated = !!session;

  // Check if current path matches any protected prefix
  const isProtectedRoute = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // If trying to access a protected route without being authenticated:
  if (isProtectedRoute && !isAuthenticated) {
    const returnTo = encodeURIComponent(pathname + search);
    const signInUrl = new URL(`/sign-in?returnTo=${returnTo}`, request.url);
    return NextResponse.redirect(signInUrl);
  }

  // If already authenticated and trying to access /sign-in, /sign-up, /login, /register:
  if (isAuthRoute && isAuthenticated) {
    const returnToParam = request.nextUrl.searchParams.get("returnTo");
    if (returnToParam) {
      try {
        const decoded = decodeURIComponent(returnToParam);
        if (decoded.startsWith("/") && !decoded.startsWith("//")) {
          return NextResponse.redirect(new URL(decoded, request.url));
        }
      } catch {
        // Fallback to default redirect
      }
    }
    const defaultDestination = session?.role === "ADMIN" ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(defaultDestination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
