import { z } from "zod"

// const ImageTypeEnum = z.enum(["front","back","sideL","sideR"]);

// const ProductImageSchema = z.object({
//     type: ImageTypeEnum,
//     url: z.string().url(),
// })

export const addSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(5).optional(),
    color: z.string().min(3),
    brand: z.string().min(3),
    category: z.coerce.number().int(),
    // size: z.string().min(1),
    small: z.coerce.number().int().min(1),
    medium: z.coerce.number().int().min(1),
    large: z.coerce.number().int().min(1),
    extralarge: z.coerce.number().int().min(1),
    // stock: z.coerce.number().int().min(1),
    price: z.coerce.number().int().min(1),
    imageUrl: z.string().url(),
    backImageUrl: z.string().url(),

})