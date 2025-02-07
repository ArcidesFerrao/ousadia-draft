"use server"
import db from "@/db/db";
import { authOptions } from "@/lib/auth";
import { addSchema, updateSchema } from "@/schema/productSchema";
import { parseWithZod } from "@conform-to/zod";
import { getServerSession } from "next-auth";
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
        ProductSize: {
          create: [
            {
              size: "s",
              stock: submission.value.small,
            },
            {
              size: "m",
              stock: submission.value.medium,
            },
            {
              size: "l",
              stock: submission.value.large,
            },
            {
              size: "xl",
              stock: submission.value.extralarge,
            },
          ]
          
        },
        category: {
          connect: { id: submission.value.category }
        },
        imageUrl: submission.value.imageUrl,
        images: {
          create: [
            {
              type: "front",
              url: submission.value.imageUrl,
            },
            {
              type: "back",
              url: submission.value.backImageUrl,
            }
          ]
        }
    }
  })
  
  console.log(addNewProduct);
  
  revalidatePath("/")
  revalidatePath("/products")

  
  if ( submission.status === "success" ) {
    return {
      status: "success",
      message: "Product created successfully"
    }
  }
  
  redirect("/admin/products")
  
} 

export async function updateProduct(prevState: unknown, formData: FormData ) {
    const submission = parseWithZod(formData, { schema: updateSchema });

    if (submission.status !== "success") {
      return submission.error;
    } else if (submission.status === "success") console.log(submission)

    const updatedProduct = await db.product.update({
        where: { id: submission.value.productId },
        data: {
          name: submission.value.name,
          description: submission.value.description,
          price: submission.value.price,
          discounted: submission.value.discounted,
          discountAmount: submission.value.discounted ? submission.value.discountAmount : 0,
          color: submission.value.color,
          brand: submission.value.brand,
          category: {
            connect: { id: submission.value.category }
          },
  
        }
    });

    const sizeUpdates = [
      { size: "s", stock: submission.value.small },
      { size: "m", stock: submission.value.medium },
      { size: "l", stock: submission.value.large },
      { size: "xl", stock: submission.value.extralarge },
    ];

    const updatedSizes = await Promise.all(
      sizeUpdates.map(({ size, stock }) => db.productSize.updateMany({
        where: {
          productId: submission.value.productId,
          size
        },
        data: { stock }
      }
    ))
    ) 
    
    if (!updatedProduct) return { success: false, errors: "problem with product data"}
    if (!updatedSizes) return { success: false, errors: "problem with size data"}

  console.log(updatedProduct, updatedSizes);
  revalidatePath("/")
  revalidatePath("/products")
  
  // return { success: true, updatedProduct}
  
  if ( submission.status === "success" ) {
    return {
      status: "success",
      message: "Product Updated successfully"
    }
  }
  
  redirect("/admin/products")

}


export async function deleteProduct(id: string) {
  const productImage = await db.productImage.deleteMany({where: { productId: id }})
  const productSize = await db.productSize.deleteMany({where: { productId: id}})
  const product = await db.product.delete({ where: { id } })

  if (product == null) return "product not found"

  console.log(productImage, productSize)

  revalidatePath("/")
  revalidatePath("/products")

}


export async function buyProduct(id: string, value: number, productSize: string) {
  const session = await getServerSession(authOptions);
  
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

  if (session) {

    const userId = session.user.id;
    const pedido = await db.order.create({
      data: {
        productId: id,
        price: producto?.price,
        quantity: value,
        totalPrice: producto.price * value,
        productSizeId: size.id,
        userId,
      }
    })
  console.log(pedido)

  } else {

    const pedido = await db.order.create({
      data: {
        productId: id,
        price: producto?.price,
        quantity: value,
        totalPrice: producto.price * value,
        productSizeId: size.id,
      }
    })
  console.log(pedido)

  }

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

  console.log( buying)
  revalidatePath("/")
  revalidatePath("/produtos")
  revalidatePath("/admin/products")
  redirect(`/produtos/${id}`)
}


export async function getFirstPromo() {
  const promo = await db.product.findFirst({
    where: {
      discounted: true
    },
    select: {
      id: true,
      name: true,
      discountAmount: true,
    }
  })

  return promo;
}