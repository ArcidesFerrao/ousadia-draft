import OrdersByDay from "@/components/charts/OrdersByDay";
import { ReportCard } from "@/components/Dashboard";
import db from "@/db/db";
import { Prisma } from "@prisma/client";
import {
  eachDayOfInterval,
  formatDate,
  interval,
  startOfDay,
  subDays,
} from "date-fns";
// import db from "@/db/db";
import React from "react";

async function getSalesData(
  createdAfter: Date | null,
  createdBefore: Date | null
) {
  const createdAtQuery: Prisma.OrderWhereInput["createdAt"] = {};

  if (createdAfter) createdAtQuery.gte = createdAfter;
  if (createdBefore) createdAtQuery.lte = createdBefore;

  const [data, chartData] = await Promise.all([
    db.order.aggregate({
      _sum: { totalPrice: true },
      _count: true,
    }),

    db.order.findMany({
      select: { createdAt: true, totalPrice: true },
      where: { createdAt: createdAtQuery },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const dayArray = eachDayOfInterval(
    interval(
      createdAfter || startOfDay(chartData[0].createdAt),
      createdBefore || new Date()
    )
  ).map((date) => {
    return {
      date: formatDate(date, "dd/MM"),
      totalOfSales: 0,
    };
  });

  return {
    chartData: chartData.reduce((data, order) => {
      const formatedDate = formatDate(order.createdAt, "dd/MM");
      const entry = dayArray.find(
        (day) => day.date.toString() === formatedDate
      );
      if (entry == null) return data;
      entry.totalOfSales += order.totalPrice;
      return data;
    }, dayArray),
    amount: data._sum.totalPrice,
    numberOfSales: data._count,
  };
}

export default async function ReportsPage() {
  const salesData = await getSalesData(subDays(new Date(), 6), new Date());
  return (
    <main className="admin-reports text-zinc-300">
      <div className="reports-header">
        <h2>Relatorios de Vendas</h2>
      </div>
      <div className="summary flex gap-4">
        <ReportCard
          title="Receita Total"
          subtitle={`${salesData.amount}.00 MZN`}
        />
        <ReportCard
          title="Vendas Totais"
          subtitle={`${salesData.numberOfSales}`}
        />
      </div>
      <div className="report-chart flex flex-col gap-8 p-4 rounded-md ">
        <h3 className="px-4">Total de Vendas Diarias</h3>
        <OrdersByDay data={salesData.chartData} />
      </div>
    </main>
  );
}

// async function getSalesData() {
//   const chartData = await db.order.findMany({
//     select: { createdAt: true, totalPrice: true },
//   });

//   return chartData;
// }
