import Nav, { NavLink } from "@/components/Nav";
import NavIcon from "@/components/NavIcon";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <div className="flex-helper"></div>
        <div className="nav-icon-admin">
          <NavLink href="/admin">
            <NavIcon />
          </NavLink>
        </div>

        <div className="admin-links flex items-center">
          <NavLink href="/admin/products">Produtos</NavLink>
          <NavLink href="/admin/sales">Relatorios</NavLink>
        </div>
      </Nav>
      {children}
    </>
  );
}
