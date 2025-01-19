import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { NavBar } from "@/components/Nav";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
// import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Ousadia",
  description: "Marca moçambicana de vestuário",
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
        <SessionProvider>
          <NavBar />
          {/* <Breadcrumbs withHome> */}
          <Toaster position="top-center" />
          {children}
          {/* </Breadcrumbs> */}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
