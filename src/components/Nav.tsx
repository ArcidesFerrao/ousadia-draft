"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

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
