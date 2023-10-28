class SegmentNotFoundException extends Error {
    constructor(msg: string = 'Segment not found!') {
        super(msg);
        this.name = 'SegmentNotFoundException';
        this.message = msg;
    }
}

export { SegmentNotFoundException };