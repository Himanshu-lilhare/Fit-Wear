"use strict";
exports.__esModule = true;
exports.deleteFromCartBody = exports.addToCartBody = exports.registerUserBody = void 0;
var zod_1 = require("zod");
exports.registerUserBody = zod_1.z.object({
    name: zod_1.z.string().min(4).max(60),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
// add to cart body
exports.addToCartBody = zod_1.z.object({
    productId: zod_1.z.string(),
    qty: zod_1.z.number().int().min(1)
});
// delete from cart
exports.deleteFromCartBody = zod_1.z.object({
    productId: zod_1.z.string()
});
