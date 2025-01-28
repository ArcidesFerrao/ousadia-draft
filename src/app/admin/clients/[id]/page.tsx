import db from "@/db/db";
import Image from "next/image";
import React from "react";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      orders: {
        select: {
          id: true,
          product: true,
          quantity: true,
          totalPrice: true,
        },
      },
    },
  });

  if (!user) return <p>Usuario nao encontrado</p>;

  return (
    <main className="admin-orders text-zinc-300">
      <div className="client-header">
        <div className="flex gap-4">
          <Image
            className="rounded-full"
            src={user.image || "/assets/line-md--account.png"}
            alt="avatar"
            width={48}
            height={48}
          />
          <h2>{user.name}</h2>
        </div>
      </div>
      <div>
        <table className=" max-w-3xl w-full">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preco</th>
              <th>Total a Pagar</th>
            </tr>
          </thead>
          <tbody>
            {user.orders.map((order) => (
              <tr key={order.id}>
                <td>{order.product.name}</td>
                <td>{order.quantity}</td>
                <td>{order.product.price}.00</td>
                <td>{order.totalPrice}.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
