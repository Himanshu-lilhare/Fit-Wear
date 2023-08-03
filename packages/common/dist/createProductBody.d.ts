import { z } from "zod";
export declare const createProductBody: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    category: z.ZodEnum<["jeans", "t-shirt"]>;
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
    category: "jeans" | "t-shirt";
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
    category: "jeans" | "t-shirt";
    seller: string;
    stock: number;
    ratings?: number | undefined;
    reviews?: {
        comment: string;
    } | undefined;
}>;
//# sourceMappingURL=createProductBody.d.ts.map