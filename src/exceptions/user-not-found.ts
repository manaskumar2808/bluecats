class UserNotFoundException extends Error {
    constructor(msg: string = 'User not found!') {
        super(msg);
        this.name = 'UserNotFoundException';
        this.message = msg;
    }
}

export { UserNotFoundException };