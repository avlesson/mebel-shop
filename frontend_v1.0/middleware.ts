import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Add security headers
  const response = NextResponse.next()

  // Add CORS headers if needed
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")

  // Add cache control headers for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600")
  }

  return response
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
}
