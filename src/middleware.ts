import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

// Block Poland, prefer Canada
const BLOCKED_COUNTRY = ["PL"];
export const config = {
  matcher: "/",
}

export function middleware(req: NextRequest, _next: NextFetchEvent, res: NextResponse) {
  // Extract country
  const country = req.geo?.country ?? "";
  // Specify the correct pathname
  if (BLOCKED_COUNTRY?.includes(country)) {
    return NextResponse.rewrite(new URL("/blocked", req.url));
  }
  if(req.nextUrl?.pathname === "/blocked") {
    if (BLOCKED_COUNTRY?.includes(country)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", req.url));
  }
  
}