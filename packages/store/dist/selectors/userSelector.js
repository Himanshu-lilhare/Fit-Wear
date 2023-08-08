"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValueSelector = void 0;
var recoil_1 = require("recoil");
var userAtom_1 = require("../atoms/userAtom");
exports.userValueSelector = (0, recoil_1.selector)({
    key: 'userValueSelector',
    get: function (_a) {
        var get = _a.get;
        var user = get(userAtom_1.userAtom).user;
        return user;
    }
});
