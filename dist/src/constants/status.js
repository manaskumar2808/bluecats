"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["SUCCESS"] = 200] = "SUCCESS";
    StatusCode[StatusCode["PAGE_NOT_FOUND"] = 404] = "PAGE_NOT_FOUND";
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
