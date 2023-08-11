import { z } from "zod";
import { Document } from 'mongoose';
import { Cart } from "./CartTypes";
export declare const registerUserBody: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export type RegisterUserType = z.infer<typeof registerUserBody>;
export declare const addToCartBody: z.ZodObject<{
    productId: z.ZodString;
    qty: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    productId: string;
    qty: number;
}, {
    productId: string;
    qty: number;
}>;
export type AddToCartFront = z.infer<typeof addToCartBody>;
export declare const deleteFromCartBody: z.ZodObject<{
    productId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    productId: string;
}, {
    productId: string;
}>;
export type DeleteFromCart = z.infer<typeof addToCartBody>;
interface Address {
    street: string;
    city: string;
    state: string;
    phone: string;
    zipcode: string;
    country: string;
    createdAt: Date;
}
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
export {};
//# sourceMappingURL=UserTypes.d.ts.map