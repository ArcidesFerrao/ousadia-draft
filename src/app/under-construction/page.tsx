import { NavLink } from "@/components/Nav";
import Link from "next/link";

export default function UnderConstruction() {
  return (
    <main
      style={{
        textAlign: "center",
        padding: "50px",
      }}
    >
      <h1>🚧 Page Under Construction 🚧</h1>
      <p>We're working hard to bring you this page. Check back soon!</p>
      <NavLink href="/">Go Back Home</NavLink>
    </main>
  );
}
