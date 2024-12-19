import DashboardCard, {
  DashboardCardMost,
  DashboardCardTotal,
  DashBoardOverview,
} from "@/components/Dashboard";
import { DashProductCard } from "@/components/ProductCard";
import cart from "@/app/assets/shopping-cart.png";
import chart from "@/app/assets/chart-histogram.png";
import bag from "@/app/assets/mall-bag.png";

export default function AdminPage() {
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
  ];
  return (
    <main className="admin-main ">
      <header>
        <h2>Overview</h2>
      </header>
      <DashBoardOverview>
        <DashboardCardTotal title="Total de Vendas" subtitle="220.00" />
        <DashboardCard title="Produtos" subtitle="86" iconUrl={cart.src} />
        <DashboardCard title="Pedidos" subtitle="34" iconUrl={bag.src} />
        <DashboardCard title="Clientes" subtitle="12" iconUrl={chart.src} />
      </DashBoardOverview>
      <DashboardCardMost>
        {dados &&
          dados.map((produto) => (
            <DashProductCard
              key={produto.id}
              name={produto.name}
              price={produto.price}
              imageUrl={produto.image}
            />
          ))}
      </DashboardCardMost>
    </main>
  );
}
