"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNameAlreadyOccupiedException = void 0;
class UserNameAlreadyOccupiedException extends Error {
    constructor(msg = 'Username is already occupied!') {
        super(msg);
        this.name = 'UserNameAlreadyOccupiedException';
        this.message = msg;
    }
}
exports.UserNameAlreadyOccupiedException = UserNameAlreadyOccupiedException;
