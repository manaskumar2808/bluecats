class GalleryNotFoundException extends Error {
    constructor(msg: string = 'Gallery not found!') {
        super(msg);
        this.name = 'GalleryNotFoundException';
        this.message = msg;
    }
}

export { GalleryNotFoundException };