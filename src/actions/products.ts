"use server"
import db from "@/db/db";
import { addSchema } from "@/schema/productSchema";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function addProduct(prevState: unknown, formData: FormData) {

  const submission = parseWithZod(formData, { schema: addSchema });

  if(submission.status !== "success") return submission.error;

  const addNewProduct = await db.product.create({
    data: {
      name: submission.value.name,
      color: submission.value.color,
      description: submission.value.description,
      brand: submission.value.brand,
      price: submission.value.price,
      size: submission.value.size,
      category: {
        connect: { id: submission.value.category }
      },
      stock: submission.value.stock,
      imageUrl: submission.value.imageUrl,
    }
  })

  console.log(addNewProduct);

  revalidatePath("/")
  revalidatePath("/products")
  redirect("/admin/products")

}

export async function updateProduct(id: string, precState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    console.log(result.data)
}