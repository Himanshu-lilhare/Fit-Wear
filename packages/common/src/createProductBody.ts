
import {z} from "zod"

export const createProductBody = z.object({
    name: z.string().min(1).max(40),
    description: z.string().min(20),
    price: z.number().min(0),
    category:  z.enum(["jeans", "t-shirt"]),
    seller: z.string().min(1),
    stock: z.number().int().min(0),
    ratings:z.number().min(1).optional(),
    reviews:z.object({
        comment: z.string().min(1).max(100),
      }).optional(),

})