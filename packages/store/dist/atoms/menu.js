"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuSelector = exports.menuAtom = void 0;
var recoil_1 = require("recoil");
exports.menuAtom = (0, recoil_1.atom)({
    key: 'menuAtom',
    default: false
});
exports.menuSelector = (0, recoil_1.selector)({
    key: "menuSelector",
    get: function (_a) {
        var get = _a.get;
        var menu = get(exports.menuAtom);
        return menu;
    }
});
