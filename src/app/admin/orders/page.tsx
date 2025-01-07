import db from "@/db/db";
import React from "react";
import { UpdateStatus } from "../_components/DropdownMenu";

export default function OrdersPage() {
  return (
    <main className="admin-orders text-zinc-300">
      <div className="orders-header">
        <h2>Lista de Pedidos</h2>
      </div>
      <OrdersTable />
    </main>
  );
}

const OrdersTable = async () => {
  const orders = await db.order.findMany({
    select: {
      id: true,
      product: {
        select: {
          name: true,
        },
      },
      price: true,
      quantity: true,
      totalPrice: true,
      status: true,
      productSize: true,
    },
    orderBy: { createdAt: "desc" },
  });

  if (orders.length === 0) {
    console.log("nenhum pedido encontrado");
    return <p className="text-xl">nenhum pedido encontrado...</p>;
  }

  return (
    <table className=" max-w-3xl w-full">
      <thead>
        <tr>
          <th>Pedidos ({orders.length})</th>
          <th>Tamanho</th>
          <th>Quantidade</th>
          <th>Preco (MZN)</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.product.name}</td>
            <td>{order.productSize?.size}</td>
            <td>{order.quantity}</td>
            <td>{order.price}.00</td>
            <td>{order.totalPrice}</td>
            <td>
              <UpdateStatus status={order.status} id={order.id.toString()} />
            </td>
          </tr>
        ))}
        {/* <tr>
          <td>Maningue Cenas</td>
          <td>3</td>
          <td>900.00</td>
          <td>2700.00</td>
          <td>/</td>
        </tr> */}
      </tbody>
    </table>
  );
};
