import Express from 'express';
import path from 'path';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import multer, { diskStorage } from 'multer';

import { PageNotFound } from './routers/error/page-not-found';
import { BadRequest } from './routers/error/bad-request';
import { InternalServer } from './routers/error/internal-server';

import { GalleryRoute } from './routers/gallery';

import { GetArticlesRoute } from './routers/article';
import { GetArticleRoute } from './routers/article/show';
import { PostArticleRoute } from './routers/article/post';

const app = Express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.set('trust proxy', true);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const storage = diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      cb(null, `${timestamp}-${file.originalname}`);
    },
});

const upload = multer({ storage }).single('file');

app.use(upload);
app.use('/uploads', Express.static(path.join(__dirname, 'uploads')));

app.use(GalleryRoute);
app.use(GetArticlesRoute);
app.use(GetArticleRoute);
app.use(PostArticleRoute);

app.all('*', PageNotFound);
app.use(BadRequest);
app.use(InternalServer);

export { app };