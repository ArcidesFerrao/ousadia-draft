import db from "@/db/db";
import React from "react";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const numericId = parseInt(id, 10);

  const order = await db.order.findUnique({
    where: {
      id: numericId,
    },
    include: {
      productSize: {
        select: {
          size: true,
          stock: true,
        },
      },
      product: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <main className="admin-orders text-zinc-300">
      <div className="orders-header flex gap-4">
        <h2>Pedido: </h2>
        <h2 className="font-thin">{order?.id}</h2>
      </div>
      <div className="order-info flex flex-col gap-8">
        <div className="order-product-info flex gap-4">
          <div className="name-product">
            <h3>Nome do Produto</h3>
            <p>{order?.product.name}</p>
          </div>
          <div className="size-product">
            <h3>Tamanho</h3>
            <p>{order?.productSize?.size}</p>
          </div>
          <div className="quantity-product">
            <h3>Quantidade</h3>
            <p>{order?.productSize?.stock}</p>
          </div>
        </div>
        <div className="order-status-info flex justify-between">
          <div className="price-product">
            <h3>Preco</h3>
            <p>{order?.price}</p>
          </div>
          <div className="paid-product">
            <h3>Total Pago</h3>
            <p>{order?.totalPrice}</p>
          </div>
          <div className="status-product">
            <h3>Status</h3>
            <p>{order?.status}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
