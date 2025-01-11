"use server"

import db from "@/db/db";
import { revalidatePath } from "next/cache";



export async function updateStatus({orderId, newStatus}: {orderId: number; newStatus: string}) {
    const updatedStatus = await db.order.update({
        where: { id: orderId },
        data: { status: newStatus },
      });

    if (!updatedStatus) return console.error("error updating order status")


    console.log(updatedStatus)

    revalidatePath(`/admin/orders`)
    revalidatePath(`/admin/orders/${orderId}`)
}