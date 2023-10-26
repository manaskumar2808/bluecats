const isUrlPrefixed = (url: string, prefix: string) => {
    return url.startsWith(prefix);
}

export const getModifiedImageURL = (url: string | undefined) => {
    if(!url)
        return url;
    const uploaded = isUrlPrefixed(url, 'uploads/');
    if(uploaded)
        url = `${process.env.BASE_URL}/${url}`;
    return url;
}