import { z } from "zod";
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
    userId: z.ZodString;
    productId: z.ZodString;
    qty: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    userId: string;
    productId: string;
    qty: number;
}, {
    userId: string;
    productId: string;
    qty: number;
}>;
export type AddToCart = z.infer<typeof addToCartBody>;
export declare const deleteFromCartBody: z.ZodObject<{
    userId: z.ZodString;
    productId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    productId: string;
}, {
    userId: string;
    productId: string;
}>;
export type DeleteFromCart = z.infer<typeof addToCartBody>;
//# sourceMappingURL=UserSchemas.d.ts.map