"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import NavIcon from "./NavIcon";

export default function Nav({ children }: { children: ReactNode }) {
  return (
    <nav>
      <div className="navbar">{children}</div>
    </nav>
  );
}

export function NavLink({ ...props }) {
  const currentPath = usePathname();
  return (
    <Link
      href={props.href}
      className={`nav-link ${currentPath === props.href ? "active" : " "}`}
    >
      {props.children}
    </Link>
  );
}

export const NavBar = () => {
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    !isAdminRoute && (
      <Nav>
        <div className="nav-links flex gap-4">
          <div className="produtos">
            <NavLink href="/produtos">Produtos</NavLink>
          </div>
          <div className="categorias">
            <NavLink href="/categorias">Categorias</NavLink>
            <div className="menu-categorias flex gap-4">
              <div className="camisetes flex flex-col gap-4">
                <NavLink href="/categorias">Maningue Cenas</NavLink>
                <NavLink href="/categorias">Nhenhentsar</NavLink>
              </div>
              <div className="bones">
                <NavLink href="/categorias">Love</NavLink>
              </div>
            </div>
          </div>
          <div className="nav-about">
            <NavLink href="/about">Sobre Ousadia</NavLink>
          </div>
          <div className="nav-contact">
            <NavLink href="/contacto">Contacto</NavLink>
          </div>
        </div>
        <div className="nav-icon">
          <NavIcon />
        </div>
        <div className="nav-account">Account/Cart</div>
      </Nav>
    )
  );
};
