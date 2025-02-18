import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function Home() {
  const dados = [
    {
      id: 1,
      name: "Maningue Cenas",
      price: "900,00",
      image: "/assets/mng.jpg",
    },
    {
      id: 2,
      name: "Love",
      price: "800,00",
      image: "/assets/lv.jpg",
    },
    {
      id: 3,
      name: "Nhenhentsar",
      price: "750,00",
      image: "/assets/nhenhe.jpg",
    },
    {
      id: 4,
      name: "Nhenhentsar",
      price: "750,00",
      image: "/assets/nhenhe.jpg",
    },
  ];

  return (
    <main>
      <div className="banner-commercial"></div>

      <div className="best-products">
        <div className="list-title flex justify-between items-center">
          <h2>Mais Vendidos</h2>
          <Link href="/produtos">Ver mais</Link>
        </div>
        {/* <div className="products-list flex flex-auto justify-between"> */}
        <div className="products-list grid grid-cols-4 justify-between items-center justify-items-center">
          {dados &&
            dados.map((producto) => (
              <ProductCard
                key={producto.id}
                id={producto.id}
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
