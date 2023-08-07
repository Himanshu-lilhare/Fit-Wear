"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginError = exports.loginLoading = exports.userAuthenticate = void 0;
var recoil_1 = require("recoil");
var userAtom_1 = require("../atoms/userAtom");
exports.userAuthenticate = (0, recoil_1.selector)({
    key: "userAuthenticate",
    get: function (_a) {
        var get = _a.get;
        var isAUthencate = get(userAtom_1.userAtom).isAUthencate;
        return isAUthencate;
    }
});
exports.loginLoading = (0, recoil_1.selector)({
    key: "loginLoading",
    get: function (_a) {
        var get = _a.get;
        var loading = get(userAtom_1.userAtom).loading;
        return loading;
    }
});
exports.loginError = (0, recoil_1.selector)({
    key: "loginLoading",
    get: function (_a) {
        var get = _a.get;
        var error = get(userAtom_1.userAtom).error;
        return error;
    }
});
