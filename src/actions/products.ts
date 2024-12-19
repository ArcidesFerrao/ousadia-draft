"use server"
import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ImageTypeEnum = z.enum(["front","back","sideL","sideR"]);

const ProductImageSchema = z.object({
    type: ImageTypeEnum,
    url: z.string().url(),
})

const fileSchema = z.instanceof(File, { message: "Required"})
const imageSchema = fileSchema.refine( file => file.size === 0 || file.type.startsWith("image/"))

const addSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(5).optional(),
    color: z.string().min(3),
    brand: z.string().min(3),
    category: z.coerce.number().int(),
    size: z.string().min(1),
    stock: z.coerce.number().int().min(1),
    price: z.coerce.number().int().min(1),
    image: imageSchema,
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