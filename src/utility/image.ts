export const getModifiedImageURL = (url: string | undefined) => {
    if(!url)
        return url;
    const uploaded = url?.includes('uploads/');
    if(uploaded)
        url = `${process.env.BASE_URL}/${url}`;
    return url;
}