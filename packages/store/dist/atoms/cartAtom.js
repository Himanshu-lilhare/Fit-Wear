"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemFamily = exports.cartAtom = void 0;
var recoil_1 = require("recoil");
exports.cartAtom = (0, recoil_1.atom)({
    key: "cartAtom",
    default: [],
});
exports.cartItemFamily = (0, recoil_1.atomFamily)({
    key: "cartItematomFamily",
    default: function (id) {
        return (0, recoil_1.selector)({
            key: "cartItemSelector".concat(Math.random()),
            get: function (_a) {
                var get = _a.get;
                console.log(id + "id in family");
                var cartItems = get(exports.cartAtom);
                var item = cartItems.find(function (item) { return item._id === id; });
                console.log((item === null || item === void 0 ? void 0 : item._id) + " in the family");
                return item;
            }
        });
    }
});
