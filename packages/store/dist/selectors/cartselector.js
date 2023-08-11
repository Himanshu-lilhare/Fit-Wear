"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartLength = exports.cartTotal = void 0;
var recoil_1 = require("recoil");
var cartAtom_1 = require("../atoms/cartAtom");
exports.cartTotal = (0, recoil_1.selector)({
    key: "cartTotal",
    get: function (_a) {
        var get = _a.get;
        var cartItems = get(cartAtom_1.cartAtom);
        if (cartItems.length > 0) {
            var total = cartItems.reduce(function (acc, curr) {
                var _a;
                if (curr.qty) {
                    acc = acc + ((_a = curr === null || curr === void 0 ? void 0 : curr.oneProduct) === null || _a === void 0 ? void 0 : _a.price) * curr.qty;
                }
                return acc;
            }, 0);
            return total;
        }
        else {
            return 0;
        }
    },
});
exports.cartLength = (0, recoil_1.selector)({
    key: "cartLength",
    get: function (_a) {
        var get = _a.get;
        var cartItems = get(cartAtom_1.cartAtom);
        return cartItems.length;
    },
});
