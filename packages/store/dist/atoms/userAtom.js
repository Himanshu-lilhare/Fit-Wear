"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAtom = void 0;
var recoil_1 = require("recoil");
exports.userAtom = (0, recoil_1.atom)({
    key: "userAtom",
    default: {
        isAUthencate: false,
        loading: false,
        user: {},
        error: ""
    }
});
