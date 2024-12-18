import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { NavBar } from "@/components/Nav";
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
        <NavBar />
        <Breadcrumbs withHome>{children}</Breadcrumbs>
        <Footer />
      </body>
    </html>
  );
}
