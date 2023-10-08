"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerException = void 0;
class InternalServerException extends Error {
    constructor(msg = 'Internal server exception!') {
        super(msg);
        this.name = 'InternalServerException';
        this.message = msg;
    }
}
exports.InternalServerException = InternalServerException;
