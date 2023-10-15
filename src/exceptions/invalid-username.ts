class InvalidUserNameException extends Error {
    constructor(msg: string = 'Invalid Username!') {
        super(msg);
        this.name = 'InvalidUserNameException';
        this.message = msg;
    }
}

export { InvalidUserNameException };