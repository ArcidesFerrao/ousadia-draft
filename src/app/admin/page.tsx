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
import ProductPromo from "./_components/ProductPromo";

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

async function getUsersData() {
  const userCount = await db.user.aggregate({
    _count: true,
  });

  return userCount;
}

async function getProductsData() {
  const productsCount = await db.product.count();

  return productsCount;
}

async function getMostSales() {
  const mostSales = await db.order.groupBy({
    by: ["productId"],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: 3,
  });

  const resultData = await Promise.all(
    mostSales.map(async (entry) => {
      const product = await db.product.findUnique({
        where: { id: entry.productId },
      });
      return {
        name: product?.name,
        quantity: entry._sum.quantity,
        imageUrl: product?.imageUrl,
        price: product?.price,
      };
    })
  );

  return resultData;
}

async function getDiscounted() {
  const discountedData = await db.product.findMany({
    where: {
      discounted: true,
    },
    select: {
      id: true,
      name: true,
      discountAmount: true,
    },
  });

  return discountedData;
}

export default async function AdminPage() {
  const [ordersData, usersData, productsData, salesData, discountedData] =
    await Promise.all([
      getOrdersData(),
      getUsersData(),
      getProductsData(),
      getMostSales(),
      getDiscounted(),
    ]);

  return (
    <main className="admin-main ">
      <header>
        <h2>Overview</h2>
      </header>
      <DashBoardOverview>
        <DashboardCardTotal
          title="Total de Vendas"
          subtitle={`${ordersData.amount}.00`}
          pageUrl="/admin/reports"
        />
        <DashboardCard
          title="Produtos"
          subtitle={`${productsData}`}
          iconUrl={cart.src}
          pageUrl="/admin/products"
        />
        <DashboardCard
          title="Pedidos"
          subtitle={`${ordersData.numberOfOrders}`}
          iconUrl={bag.src}
          pageUrl="/admin/orders"
        />
        <DashboardCard
          title="Clientes"
          subtitle={usersData._count.toLocaleString()}
          iconUrl={chart.src}
          pageUrl="/admin/clients"
        />
      </DashBoardOverview>
      <DashboardCardMost>
        {salesData.map((produto, index) => (
          <DashProductCard
            key={index}
            name={produto.name}
            price={produto.price}
            imageUrl={produto.imageUrl}
            quantity={produto.quantity}
          />
        ))}
      </DashboardCardMost>
      <ProductPromo data={discountedData} />
    </main>
  );
}
