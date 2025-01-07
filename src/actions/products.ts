"use server"
import db from "@/db/db";
// import { useTransition } from "react"
import { addSchema } from "@/schema/productSchema";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";


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
        ProductSize: {
          create: {
            size: submission.value.size,
            stock: submission.value.stock,
          }
        },
        category: {
          connect: { id: submission.value.category }
        },
        imageUrl: submission.value.imageUrl,
    }
  })
  
  console.log(addNewProduct);
  
  revalidatePath("/")
  revalidatePath("/products")
  // redirect("/admin/products")
  if ( submission.status === "success" ) {

    return {
      status: "success",
      message: "Post created successfully"
    }
  }
  
} 

export async function updateProduct(id: string, precState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    console.log(result.data)
}


export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } })

  if (product == null) return "product not found"

  

  revalidatePath("/")
  revalidatePath("/products")



}


export async function buyProduct(id: string, value: number, productSize: string) {
  const producto = await db.product.findUnique({
    where: { id },
    select: {
      price: true,
      ProductSize: {
        select: {
          id: true,
          size: true,
          stock: true,
        }
      }
    }
  })

  if (!producto) return "product not found";

  const size = producto.ProductSize.find((s) => s.size === productSize)

  // const size = db.productSize.findFirst({
  //   where: {
  //     size: productSize
  //   },
  //   select: {
  //     id: true
  //   }
  // })

  if (!size) return "inexistent size";

  const pedido = await db.order.create({
    data: {
      productId: id,
      price: producto?.price,
      quantity: value,
      totalPrice: producto.price * value,
      productSizeId: size.id,
    }
  })

  const buying = await db.product.update({
    where: { id },
    data: {
      ProductSize: {
        update: {
          where: {
            id: size.id,
          },
          data: {
            stock: {
              decrement: value,
            }
          }
        }
        
      }
    }
  })

  console.log(pedido, buying)
  revalidatePath("/")
  revalidatePath("/produtos")
  revalidatePath("/admin/products")
  redirect(`/produtos/${id}`)
}