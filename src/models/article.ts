import mongoose from 'mongoose';
import { ArticleMode } from '../constants/article';

interface ArticleAttr {
    title?: string;
    segments: string[];
    author: string;
    image?: string;
    mode?: string;
}

interface ArticleModel extends mongoose.Model<ArticleDoc> {
    build(attrs: ArticleAttr): ArticleDoc;
}

interface ArticleDoc extends mongoose.Document {
    title?: string;
    segments: string[];
    author: string;
    image?: string;
    mode?: string;
}

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    segments: [{
        type: String,
        ref: 'Segment',
        required: false,
    }],
    image: {
        type: String,
        required: false,
    },
    author: {
        type: String,
        ref: 'User',
        required: true,
    },
    mode: {
        type: String,
        required: true,
        default: ArticleMode.PUBLISHED,
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

ArticleSchema.statics.build = (attrs: ArticleAttr) => {
    return new Article(attrs);
}

const Article = mongoose.model<ArticleDoc, ArticleModel>('Article', ArticleSchema);

export { Article, ArticleDoc };