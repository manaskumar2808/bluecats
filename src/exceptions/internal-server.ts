class InternalServerException extends Error {
    constructor(msg: string = 'Internal server exception!') {
        super(msg);
        this.name = 'InternalServerException';
        this.message = msg;
    }
}

export { InternalServerException };