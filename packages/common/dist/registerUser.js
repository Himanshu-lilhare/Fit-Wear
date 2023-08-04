"use strict";
exports.__esModule = true;
exports.registerUserBody = void 0;
var zod_1 = require("zod");
exports.registerUserBody = zod_1.z.object({
    name: zod_1.z.string().min(4).max(60),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
