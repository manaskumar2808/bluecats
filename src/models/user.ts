import mongoose from 'mongoose';

interface UserAttr {
    email: string;
    phone: string;
    name: string;
    password: string;
    image: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttr): UserDoc;
}

interface UserDoc extends mongoose.Document {
    email: string;
    phone: string;
    name: string;
    password: string;
    image: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        ref: 'Gallery',
        required: false,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    },
    timestamps: true,
});

userSchema.statics.build = (attrs: UserAttr) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User, UserDoc };