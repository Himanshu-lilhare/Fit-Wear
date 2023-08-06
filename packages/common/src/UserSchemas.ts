import {z} from "zod"
import { Document, Schema } from 'mongoose';


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


// user type


// Define the Address sub-document type
interface Address {
  street: string;
  city: string;
  state: string;
  phone: string;
  zipcode: string;
  country: string;
  createdAt: Date;
}

// Define the Cart sub-document type
interface Cart {
  oneProduct: Schema.Types.ObjectId;
  qty?: number;
}

// Define the main User document type
export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  role: 'user' | 'admin';
  address?: Address[];
  cart?: Cart[];
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}
