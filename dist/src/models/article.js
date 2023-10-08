"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ArticleSchema = new mongoose_1.default.Schema({
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
ArticleSchema.statics.build = (attrs) => {
    return new Article(attrs);
};
const Article = mongoose_1.default.model('Article', ArticleSchema);
exports.Article = Article;
