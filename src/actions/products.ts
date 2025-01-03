"use server"
import db from "@/db/db";
import { addSchema } from "@/schema/productSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";




const fileSchema = z.instanceof(File, { message: "Required"})
const imageSchema = fileSchema.refine( file => file.size === 0 || file.type.startsWith("image/"))



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
        category: {
            connect: { id: data.category}
        },
        stock: data.stock,
    }
  })
  console.log(newProduct);


  revalidatePath("/")
  revalidatePath("/products")
  redirect("/admin/products")

}

const editSchema = addSchema.extend({
    image: imageSchema.optional(),
})

export async function updateProduct(id: string, precState: unknown, formData: FormData) {
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
    console.log(result.data)
}