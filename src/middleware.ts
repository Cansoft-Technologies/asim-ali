import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

// Block Poland, prefer Canada
const BLOCKED_COUNTRY = 'PL'

// Limit middleware pathname config
export const config = {
  matcher: '/',
}

export function middleware(req: NextRequest) {
  // Extract country
  const country = req.geo.country;
  if(req.nextUrl.pathname === '/blocked') {
    if (country === BLOCKED_COUNTRY) {
      return NextResponse.next();
    }
    return NextResponse.redirect('/');
  }

  // Specify the correct pathname
  if (country === BLOCKED_COUNTRY) {
    return NextResponse.redirect('/blocked');
  }
}