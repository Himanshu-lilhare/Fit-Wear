import { z } from 'zod';
export declare const deleteProductBody: z.ZodArray<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>, "many">;
export type deleteProductParam = z.infer<typeof deleteProductBody>;
export declare const createProductBody: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    category: z.ZodEnum<["jeans", "t-shirts"]>;
    seller: z.ZodString;
    stock: z.ZodNumber;
    ratings: z.ZodOptional<z.ZodNumber>;
    reviews: z.ZodOptional<z.ZodObject<{
        comment: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        comment: string;
    }, {
        comment: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    price: number;
    category: "jeans" | "t-shirts";
    seller: string;
    stock: number;
    ratings?: number | undefined;
    reviews?: {
        comment: string;
    } | undefined;
}, {
    name: string;
    description: string;
    price: number;
    category: "jeans" | "t-shirts";
    seller: string;
    stock: number;
    ratings?: number | undefined;
    reviews?: {
        comment: string;
    } | undefined;
}>;
export type createProductParams = z.infer<typeof createProductBody>;
interface Review {
    comment: string;
    createdAt: Date;
}
export type Images = {
    public_id: string;
    url: string;
};
export interface ProductType {
    _id?: string;
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
export {};
//# sourceMappingURL=ProductTypes.d.ts.map