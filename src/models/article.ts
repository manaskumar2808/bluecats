import mongoose from 'mongoose';

interface ArticleAttr {
    title: string;
    content: string;
    author: string;
    image?: string;
}

interface ArticleModel extends mongoose.Model<ArticleDoc> {
    build(attrs: ArticleAttr): ArticleDoc;
}

interface ArticleDoc extends mongoose.Document {
    title: string;
    content: string;
    author: string;
    image?: string;
}

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        ref: 'Gallery',
        required: false,
    },
    author: {
        type: String,
        ref: 'User',
        required: true,
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