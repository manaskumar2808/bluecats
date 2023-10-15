class ArticleNotFoundException extends Error {
    constructor(msg: string = 'Article not found!') {
        super(msg);
        this.name = 'ArticleNotFoundException';
        this.message = msg;
    }
}

export { ArticleNotFoundException };