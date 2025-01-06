"use client";

import React from "react";
import {
  Bar,
  BarChart,
  //   CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type OrderByDayProps = {
  data: {
    date: string;
    totalOfSales: number;
  }[];
};

export default function OrdersByDay({ data }: OrderByDayProps) {
  return (
    <ResponsiveContainer width={600} minHeight={300}>
      <BarChart data={data} width={600} height={300}>
        {/* <CartesianGrid /> */}
        <XAxis dataKey="date" stroke="hsl(0, 0%, 80%)" />
        <YAxis stroke="hsl(0, 0%, 80%)" />
        <Tooltip cursor={{ fill: "hsl(0, 0%, 27%)" }} />
        <Bar dataKey="totalOfSales" name="Total Sales" />
      </BarChart>
    </ResponsiveContainer>
  );
}
