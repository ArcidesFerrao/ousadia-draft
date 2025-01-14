// import db from "@/db/db";
// import { Product } from "@prisma/client";
// import React, { useEffect, useState } from "react";

// const productsData = async () => {
//   const data = await db.product.findMany();

//   return data;
// };

export default function CategoriesPage() {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [groupedProducts, setGroupedProducts] = useState<any>({});

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const fetchedProducts = await productsData();
  //     setProducts(fetchedProducts);
  //     const grouped = fetchedProducts.reduce((acc: any, product: Product) => {
  //       if (!acc[product.categoryId]) {
  //         acc[product.category] = [];
  //       }
  //       acc[product.category].push(product);
  //       return acc;
  //     }, {});

  //     setGroupedProducts(grouped);
  //   };

  //   getProducts();
  // }, []);

  return (
    <main className="py-4">
      <div className="shirts-list">
        <div className="title">
          <h2>Shetas</h2>
        </div>
        <div className="products-list flex flex-auto justify-between"></div>
      </div>
      <div className="hats-list">
        <div className="title">
          <h2>Bonés</h2>
        </div>
        <div className="products-list flex flex-auto justify-between"></div>
      </div>
      <div className="collabs-list">
        <div className="title">
          <h2>Collabs</h2>
        </div>
        <div className="products-list flex flex-auto justify-between"></div>
      </div>
      <div className="brands-list">
        <div className="title">
          <h2>Marcas</h2>
        </div>
        <div className="products-list flex flex-auto justify-between"></div>
      </div>
    </main>
  );
}
