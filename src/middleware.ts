import { NextRequest, NextResponse } from 'next/server'

const underConstructionPages = ['/about', '/contacto', '/categorias' ]

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (underConstructionPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/under-construction', request.url))
  }

    return NextResponse.next();
}
