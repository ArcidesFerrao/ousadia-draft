import { NextResponse } from 'next/server'
import React from 'react'

const underConstructionPages = ['/about', '/contacto', '/categorias' ]

export default function middleware(request: { nextUrl: { pathname: any; }; url: string | URL | undefined; }) {
  const { pathname } = request.nextUrl;

  if (underConstructionPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/under-construction', request.url))
  }

    return NextResponse.next();
}
