import ProductCard from "@/components/ProductCard";
import dados from "@/app/assets/dados.json";
import db from "@/db/db";

export default async function ProdutosPage() {
  const productsData = getProducts();

  if ((await productsData).length === 0) {
    console.log("no products found");
  }

  return (
    <main className="py-4">
      <div className="best-products">
        <div className="title">
          <h2>Mais Vendidos</h2>
        </div>
        <div className="products-list flex flex-auto justify-between">
          {dados &&
            dados.map((producto) => (
              <ProductCard
                key={producto.key}
                id={producto.key}
                name={producto.name}
                price={producto.price}
                imageUrl={producto.image}
              />
            ))}
        </div>
      </div>
      <div className="new-products">
        <div className="title">
          <h2>Lancamentos</h2>
        </div>
        <div className="products-list">
          {productsData &&
            (await productsData).map((producto) => (
              <ProductCard
                key={producto.id}
                id={producto.id}
                name={producto.name}
                price={producto.price}
                imageUrl={producto.imageUrl}
              />
            ))}
        </div>
      </div>
    </main>
  );
}

async function getProducts() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
      price: true,
    },
  });

  return products;
}
