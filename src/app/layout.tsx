import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Nav, { NavLink } from "@/components/Nav";
import NavIcon from "@/components/NavIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Ousadia",
  description: "Loja de Camisetes",
};

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className} antialiased`}>
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
        <Breadcrumbs withHome>{children}</Breadcrumbs>
        <Footer />
      </body>
    </html>
  );
}
