"use strict";
exports.__esModule = true;
exports.createProductBody = exports.deleteProductBody = void 0;
var zod_1 = require("zod");
// deleteProduct
var deleteProductArray = zod_1.z.object({});
exports.deleteProductBody = zod_1.z.array(deleteProductArray);
// createProduct
exports.createProductBody = zod_1.z.object({
    name: zod_1.z.string().min(1).max(40),
    description: zod_1.z.string().min(20),
    price: zod_1.z.number().min(0),
    category: zod_1.z["enum"](["jeans", "t-shirt"]),
    seller: zod_1.z.string().min(1),
    stock: zod_1.z.number().int().min(0),
    ratings: zod_1.z.number().min(1).optional(),
    reviews: zod_1.z.object({
        comment: zod_1.z.string().min(1).max(100)
    }).optional()
});
