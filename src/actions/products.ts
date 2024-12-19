"use server"
import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const addSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(5).optional(),
    color: z.string().min(3),
    brand: z.string().min(3),
    category: z.string(),
    size: z.string().min(1),
    stock: z.coerce.number().int().min(1),
    price: z.coerce.number().int().min(1),
    
})

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return {
        errors: result.error.flatten().fieldErrors,
    }
  }

  const data = result.data;
  console.log(data.color);

  const newProduct = await db.product.create({
    data: {
        name: data.name,
        color: data.color,
        description: data.description,
        brand: data.brand,
        price: data.price,
        size: data.size,
        // category: data.category,
        stock: data.stock,
    }
  })
  console.log(newProduct);


  revalidatePath("/")
  revalidatePath("/products")
  redirect("/admin/products")

}
