import { z } from "zod"

// const ImageTypeEnum = z.enum(["front","back","sideL","sideR"]);

// const ProductImageSchema = z.object({
//     type: ImageTypeEnum,
//     url: z.string().url(),
// })

export const addSchema = z.object({
    productId: z.string().min(3).optional(),
    name: z.string().min(3),
    description: z.string().min(5).optional(),
    color: z.string().min(3),
    brand: z.string().min(3),
    category: z.coerce.number().int(),
    small: z.coerce.number().int().min(0),
    medium: z.coerce.number().int().min(0),
    large: z.coerce.number().int().min(0),
    extralarge: z.coerce.number().int().min(0),
    price: z.coerce.number().int().min(1),
    imageUrl: z.string().url(),
    backImageUrl: z.string().url(),

})
export const updateSchema = z.object({
    productId: z.string().min(3),
    name: z.string().min(3),
    description: z.string().min(5).optional(),
    color: z.string().min(3),
    brand: z.string().min(3),
    category: z.coerce.number().int(),
    small: z.coerce.number().int().min(0),
    medium: z.coerce.number().int().min(0),
    large: z.coerce.number().int().min(0),
    extralarge: z.coerce.number().int().min(0),
    price: z.coerce.number().int().min(1),
    discounted: z.boolean().default(false),
    discountAmount: z.coerce.number().int().optional(),
    imageUrl: z.string().url(),
    backImageUrl: z.string().url().optional(),
})