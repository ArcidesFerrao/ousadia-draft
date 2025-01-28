import { NavLink } from "@/components/Nav";
import db from "@/db/db";
import React from "react";

export default function ClientsPage() {
  return (
    <main className="admin-orders text-zinc-300">
      <div className="orders-header">
        <h2>Lista de Clientes</h2>
      </div>
      <ClientsTable />
    </main>
  );
}

const ClientsTable = async () => {
  const users = await db.user.findMany({
    include: {
      _count: {
        select: {
          orders: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (users.length === 0) {
    console.log("nenhum cliente encontrado");
    return <p className="text-xl">nenhum cliente encontrado...</p>;
  }

  return (
    <table className=" max-w-3xl w-full">
      <thead>
        <tr>
          <th>Clientes ({users.length})</th>
          <th>Pedidos</th>
          <th>...</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user._count.orders}</td>
            <td>
              <NavLink href={`/admin/clients/${user.id}`}>check</NavLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
