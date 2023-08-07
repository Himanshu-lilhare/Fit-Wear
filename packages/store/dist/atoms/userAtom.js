"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticatedSelector = exports.userAtom = void 0;
var recoil_1 = require("recoil");
exports.userAtom = (0, recoil_1.atom)({
    key: "userAtom",
    default: {
        isAuthenticated: false,
        user: {},
    },
});
exports.isAuthenticatedSelector = (0, recoil_1.selector)({
    key: "isAuthentictaedSelector",
    get: function (_a) {
        var get = _a.get;
        var isAuthenticated = get(exports.userAtom).isAuthenticated;
        return isAuthenticated;
    }
});
