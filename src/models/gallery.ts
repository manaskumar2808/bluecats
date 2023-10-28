import mongoose from 'mongoose';
import { GalleryType } from '../constants/gallery';

interface GalleryAttr {
    url: string;
    caption?: string;
    cdn?: boolean;
    type: GalleryType;
}

interface GalleryModel extends mongoose.Model<GalleryDoc> {
    build(attrs: GalleryAttr): GalleryDoc;
}

interface GalleryDoc extends mongoose.Document {
    url: string;
    caption?: string;
    cdn?: boolean;
    type: GalleryType;
}

const GallerySchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: false,
    },
    cdn: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
        default: GalleryType.IMAGE,
    }
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

GallerySchema.statics.build = (attrs: GalleryAttr) => {
    return new Gallery(attrs);
}

const Gallery = mongoose.model<GalleryDoc, GalleryModel>('Gallery', GallerySchema);

export { Gallery, GalleryDoc };