import { app } from './app';
import mongoose from 'mongoose';
import 'dotenv/config';

const port = process.env.PORT || 2000;

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.fnmec.mongodb.net/bluecats_2?authSource=admin&replicaSet=atlas-re56uq-shard-0&readPreference=primary&ssl=true`);
    
        app.listen(port, () => {
            console.log(`Server listening at port ${port}`);
        });
    } catch(err) {
        console.log('Error while starting the server', err);
    }
}

start();