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
        <div className="nav-icon-admin flex items-center">
          <NavLink href="/">
            <NavIcon />
          </NavLink>
          <NavLink href="/admin">Dashboard</NavLink>
        </div>

        <div className="admin-links flex items-center">
          <NavLink href="/admin/products">Produtos</NavLink>
          <NavLink href="/admin/orders">Pedidos</NavLink>
          <NavLink href="/admin/reports">Relatorios</NavLink>
        </div>
      </Nav>
      {children}
    </>
  );
}
