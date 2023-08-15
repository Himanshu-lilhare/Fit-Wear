import { Document } from 'mongoose'
import {z} from 'zod'

// deleteProduct
const deleteProductArray = z.object({})
export const deleteProductBody = z.array(deleteProductArray)
export type deleteProductParam = z.infer<typeof deleteProductBody>


// createProduct
export const createProductBody = z.object({
    name: z.string().min(1).max(40),
    description: z.string().min(5),
    price: z.number().min(1),
    category:  z.enum(["jeans", "t-shirts"]),
    seller: z.string().min(1),
    stock: z.number().int().min(1),
    ratings:z.number().min(1).optional(),
    reviews:z.object({
        comment: z.string().min(1).max(100),
      }).optional(),

})

export type createProductParams = z.infer<typeof createProductBody>


interface Review {
  comment: string;
  createdAt: Date;
}
export type Images = {
  public_id: string,
  url: string
}

export interface ProductType  {
  _id?:string
  name: string;
  description: string;
  price: number;
  images?: Images[];
  category: string;
  seller: string;
  stock: number;
  ratings?: number;
  reviews?: Review[];
}