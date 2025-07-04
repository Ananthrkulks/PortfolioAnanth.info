import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 🔁 If user visits /login, redirect them to /
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // ✅ Allow all other routes
  return NextResponse.next()
}
