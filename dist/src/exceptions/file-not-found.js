"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileNotFoundException = void 0;
class FileNotFoundException extends Error {
    constructor(msg = 'File not found!') {
        super(msg);
        this.name = 'FileNotFoundException';
        this.message = msg;
    }
}
exports.FileNotFoundException = FileNotFoundException;
