class InvalidPasswordException extends Error {
    constructor(msg: string = 'Invalid Password!') {
        super(msg);
        this.name = 'InvalidPasswordException';
        this.message = msg;
    }
}

export { InvalidPasswordException };