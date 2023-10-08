"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundException = void 0;
class UserNotFoundException extends Error {
    constructor(msg = 'User not found!') {
        super(msg);
        this.name = 'UserNotFoundException';
        this.message = msg;
    }
}
exports.UserNotFoundException = UserNotFoundException;
