import DashboardCard, {
  DashboardCardMost,
  DashboardCardTotal,
  DashBoardOverview,
} from "@/components/Dashboard";
import { DashProductCard } from "@/components/ProductCard";
import cart from "@/app/assets/shopping-cart.png";
import chart from "@/app/assets/chart-histogram.png";
import bag from "@/app/assets/mall-bag.png";
import db from "@/db/db";

async function getOrdersData() {
  const data = await db.order.aggregate({
    _sum: { totalPrice: true },
    _count: true,
  });

  return {
    amount: data._sum.totalPrice || 0,
    numberOfOrders: data._count,
  };
}

// async function getUsersData() {
//   const userCount = await db.user.aggregate({
//     _count: true,
//   });

//   return userCount;
// }

async function getProductsData() {
  const productsCount = await db.product.count();

  return productsCount;
}

export default async function AdminPage() {
  const [ordersData, productsData] = await Promise.all([
    getOrdersData(),
    // getUsersData(),
    getProductsData(),
  ]);
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
        <DashboardCardTotal
          title="Total de Vendas"
          subtitle={`${ordersData.amount}.00`}
        />
        <DashboardCard
          title="Produtos"
          subtitle={`${productsData}`}
          iconUrl={cart.src}
        />
        <DashboardCard
          title="Pedidos"
          subtitle={`${ordersData.numberOfOrders}`}
          iconUrl={bag.src}
        />
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
