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
//# sourceMappingURL=registerUser.d.ts.map