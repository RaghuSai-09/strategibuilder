import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = ['/profile', '/dashboard'];

// Define auth routes (should redirect to dashboard if already logged in)
const authRoutes = ['/auth'];

// Define public routes (accessible without authentication)
const publicRoutes = ['/', '/who-we-are'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies or headers
  // TODO: Replace with your actual token verification logic
  const token = request.cookies.get('token')?.value;
  const authHeader = request.headers.get('authorization');
  const isAuthenticated = !!(token || authHeader);

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

  // Check if the current route is an auth route
  const isAuthRoute = authRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

  // Redirect to login if trying to access protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    const authUrl = new URL('/auth', request.url);
    authUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(authUrl);
  }

  // Redirect to dashboard if trying to access auth routes while already authenticated
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which routes should use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
