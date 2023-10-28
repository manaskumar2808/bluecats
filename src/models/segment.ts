import mongoose from 'mongoose';
import { SegmentType } from '../constants/segment';
import { TextPayload } from '../types/segment/text-payload';
import { MediaPayload } from '../types/segment/media-payload';
import { CodePayload } from '../types/segment/code-payload';

interface SegmentAttr {
    payload: TextPayload | MediaPayload | CodePayload;
    type: SegmentType;
}

interface SegmentModel extends mongoose.Model<SegmentDoc> {
    build(attrs: SegmentAttr): SegmentDoc;
}

interface SegmentDoc extends mongoose.Document {
    payload: TextPayload | MediaPayload | CodePayload;
    type: SegmentType;
}

const SegmentSchema = new mongoose.Schema({
    payload: {
        type: Object,
        required: true,
    },
    type: {
        type: String,
        required: true,
        default: SegmentType.TEXT,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true,
});

SegmentSchema.statics.build = (attrs: SegmentAttr) => {
    return new Segment(attrs);
}

const Segment = mongoose.model<SegmentDoc, SegmentModel>('Segment', SegmentSchema);

export { Segment, SegmentDoc };