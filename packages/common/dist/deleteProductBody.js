"use strict";
exports.__esModule = true;
exports.deleteProductBody = void 0;
var zod_1 = require("zod");
var deleteProductArray = zod_1.z.object({});
exports.deleteProductBody = zod_1.z.array(deleteProductArray);
