class FileNotFoundException extends Error {
    constructor(msg: string = 'File not found!') {
        super(msg);
        this.name = 'FileNotFoundException';
        this.message = msg;
    }
}

export { FileNotFoundException };