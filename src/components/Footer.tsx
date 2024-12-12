import React from "react";
import { NavLink } from "./Nav";
import { FooterIcon } from "./NavIcon";

export default function Footer() {
  return (
    <footer>
      <section className="footer-section ">
        <div className="footer-ousadia flex items-center gap-8">
          <div className="icon-ousadia">
            <NavLink href="/">
              <FooterIcon />
            </NavLink>
          </div>
          <div className="footer-links flex flex-col">
            <NavLink href="/produtos">Produtos</NavLink>
            <NavLink href="/contacto">Contacto</NavLink>
            <NavLink href="/about">Sobre Ousadia</NavLink>
          </div>
        </div>
        <div className="footer-rights flex justify-between">
          <p>© 2024 - Todos direitos reservados</p>
          <p>
            Criado por:{` `}
            <NavLink href="hhttps://portfolio-arcidesferraos-projects.vercel.app/">
              {" "}
              Arcides Ferrao
            </NavLink>
          </p>
        </div>
      </section>
    </footer>
  );
}
