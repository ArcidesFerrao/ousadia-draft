import { CancelButton } from "@/components/AddButton";
import ProductForm from "@/components/ProductForm";
import db from "@/db/db";
import React from "react";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const produto = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      ProductSize: true,
    },
  });

  return (
    <main className="admin-products text-zinc-300">
      <div className="products-header p-4 flex items-center justify-between w-full max-w-2xl">
        <h2>Editar Produto</h2>
        <CancelButton href="/admin/products" />
      </div>
      <ProductForm product={produto} productSize={produto?.ProductSize} />
    </main>
  );
}
