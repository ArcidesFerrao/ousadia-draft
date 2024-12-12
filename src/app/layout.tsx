import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Nav, { NavLink } from "@/components/Nav";
import NavIcon from "@/components/NavIcon";

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
            <NavLink href="/produtos">Produtos</NavLink>
            <NavLink href="/categorias">Categorias</NavLink>
            <NavLink href="/about">Sobre Ousadia</NavLink>
            <NavLink href="/contacto">Contacto</NavLink>
          </div>
          <div className="nav-icon">
            <NavIcon />
          </div>
          <div className="nav-account">Account/Cart</div>
        </Nav>
        {children}
        <Footer />
      </body>
    </html>
  );
}
