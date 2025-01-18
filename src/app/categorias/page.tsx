// "use client";
import ProductCard from "@/components/ProductCard";
import db from "@/db/db";
import { Product } from "@prisma/client";

async function getProducts() {
  const products = await db.product.findMany();

  return products;
}

export default async function CategoriesPage() {
  const products = await getProducts();
  console.log(products.length);

  const groupedProducts = products.reduce<
    Record<number | "uncategorized", Product[]>
  >(
    (acc, product) => {
      const categoryId = product.categoryId ?? "uncategorized";
      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(product);
      return acc;
    },
    { uncategorized: [] }
  );
  console.log(groupedProducts);

  return (
    <main className="py-4">
      <div className="shirts-list">
        <div className="title">
          <h2>Shetas</h2>
        </div>
        <div className="products-list flex flex-auto justify-between">
          {groupedProducts[2]?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              discounted={product.discounted}
            />
          ))}
        </div>
      </div>
      <div className="hats-list">
        <div className="title">
          <h2>Bonés</h2>
        </div>
        <div className="products-list flex flex-auto justify-between">
          {groupedProducts[3]?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </div>
      <div className="collabs-list">
        <div className="title">
          <h2>Collabs</h2>
        </div>
        <div className="products-list flex flex-auto justify-between">
          {groupedProducts[4]?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </div>
      <div className="brands-list">
        <div className="title">
          <h2>Marcas</h2>
        </div>
        <div className="products-list flex flex-auto justify-between">
          {groupedProducts[5]?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
