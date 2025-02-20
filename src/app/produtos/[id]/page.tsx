import React from "react";
import Image from "next/image";
// import { BuyButtonWithSize } from "@/components/BuyButton";
import db from "@/db/db";
import { BuySection } from "@/components/BuySection";

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const produtoId = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      ProductSize: true,
    },
  });

  // console.log(produtoId?.ProductSize);

  // const produto = dados.find((item) => item.key.toString() === id);
  // //   console.log(produto);
  if (!produtoId) {
    return (
      <main className="items-center justify-center ">
        <p className="font-medium  ">Produto nao encontrado</p>
      </main>
    );
  }

  return (
    <main className="py-12">
      <div className="product-container flex justify-around w-full">
        <div className="product-image rounded-lg overflow-hidden w-fit ">
          <Image
            src={produtoId.imageUrl || ""}
            alt={produtoId.name}
            width={500}
            height={500}
          />
        </div>
        <div className="product-details flex flex-col justify-between ">
          <div className="product-header flex flex-col justify-between items-center gap-4 px-8 min-w-64">
            <div className="product-name max-w-64">
              <h2>{produtoId?.name}</h2>
            </div>
            <div className="product-price  flex   h-full">
              <h1>{produtoId?.price} MZN</h1>
            </div>
          </div>
          <div className="product-info flex flex-col gap-4">
            <div className="info-color flex justify-between">
              <h4>Cor:</h4>
              <h4>{produtoId.color}</h4>
            </div>
            <div className="buy-button flex items-center justify-center h-fit">
              <BuySection
                // productId={produtoId.id}
                name={produtoId?.name}
                imageUrl={produtoId.imageUrl}
                price={produtoId.price}
                productSize={produtoId.ProductSize}
                discounted={produtoId.discounted}
                discountAmount={produtoId.discountAmount || 0}
              />
              {/* <BuyButtonWithSize
                productId={produtoId.id}
                price={produtoId.price}
                productSize={produtoId.ProductSize}
                discounted={produtoId.discounted}
                discountAmount={produtoId.discountAmount || 0}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
