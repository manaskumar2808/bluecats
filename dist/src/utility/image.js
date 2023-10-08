"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModifiedImageURL = void 0;
const isUrlPrefixed = (url, prefix) => {
    return url.startsWith(prefix);
};
const getModifiedImageURL = (url) => {
    if (!url)
        return url;
    const uploaded = isUrlPrefixed(url, 'uploads/');
    if (uploaded)
        url = `${process.env.BASE_URL}/${url}`;
    return url;
};
exports.getModifiedImageURL = getModifiedImageURL;
