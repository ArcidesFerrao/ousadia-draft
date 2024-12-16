import ProductCard from "@/components/ProductCard";
import dados from "@/app/assets/dados.json";

export default function ProdutosPage() {
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
      </div>
    </main>
  );
}
