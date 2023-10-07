class UserNameAlreadyOccupiedException extends Error {
    constructor(msg: string = 'Username is already occupied!') {
        super(msg);
        this.name = 'UserNameAlreadyOccupiedException';
        this.message = msg;
    }
}

export { UserNameAlreadyOccupiedException };