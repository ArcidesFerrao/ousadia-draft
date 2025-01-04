"use client";

import React from "react";
import { NavLink } from "./Nav";
import { FooterIcon } from "./NavIcon";
import { usePathname } from "next/navigation";
import Image from "next/image";

// import igIcon from "/assets/instagram.png";

export default function Footer() {
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith("/admin");
  return (
    !isAdminRoute && (
      <footer>
        <section className="footer-section ">
          <div className="footer-ousadia flex items-center gap-8">
            <div className="icon-ousadia">
              <NavLink href="/">
                <FooterIcon />
              </NavLink>
            </div>
            <div className="footer-links flex flex-col gap-4">
              <div className="contact-icons flex justify-between">
                <NavLink href="/">
                  <Image
                    src="/assets/facebook.png"
                    alt="facebook"
                    width={24}
                    height={24}
                  />
                </NavLink>
                <NavLink href="/">
                  <Image
                    src="/assets/instagram.png"
                    alt="instagram"
                    width={24}
                    height={24}
                  />
                </NavLink>
                <NavLink href="/">
                  <Image
                    src="/assets/whatsapp.png"
                    alt="whatsapp"
                    width={24}
                    height={24}
                  />
                </NavLink>
              </div>
              <div className="page-links flex flex-col gap-2">
                <NavLink href="/produtos">Produtos</NavLink>
                <NavLink href="/contacto">Contacto</NavLink>
                <NavLink href="/about">Sobre Ousadia</NavLink>
              </div>
            </div>
          </div>
          <div className="footer-rights flex justify-between">
            <p>© 2024 - Todos direitos reservados</p>
            <p>
              Criado por:{` `}
              <NavLink href="https://portfolio-arcidesferraos-projects.vercel.app/">
                {" "}
                Arcides Ferrao
              </NavLink>
            </p>
          </div>
        </section>
      </footer>
    )
  );
}
