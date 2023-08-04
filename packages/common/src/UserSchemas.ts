import {z} from "zod"


export const registerUserBody = z.object({
    name:z.string().min(4).max(60),
    email:z.string().email(),
    password:z.string().min(8)
})
export type RegisterUserType = z.infer<typeof registerUserBody>

// add to cart body
export const addToCartBody = z.object({
    userId:z.string(),
    productId:z.string(),
    qty:z.number().int().min(1)
})
export type AddToCart = z.infer<typeof addToCartBody>

// delete from cart
export const deleteFromCartBody = z.object({
    userId:z.string(),
    productId:z.string(),
 
})
export type DeleteFromCart = z.infer<typeof addToCartBody>
