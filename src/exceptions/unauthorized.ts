class UnAuthorizedException extends Error {
    constructor(msg: string = 'Unauthorized access!') {
        super(msg);
        this.name = 'UnAuthorizedException';
        this.message = msg;
    }
}

export { UnAuthorizedException };