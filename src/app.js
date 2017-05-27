import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bookRouter from './routes/bookRoutes';
import Book from './models/bookModel';
import dotenv from 'dotenv';

dotenv.config();

mongoose.Promise = global.Promise;

const dbHost = process.env.NODE_ENV === 'TEST'
  ? process.env.DB_HOST_TEST : process.env.DB_HOST;
console.log(`Connected to ${dbHost}`);

const db = mongoose.connect(dbHost);

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/books/', bookRouter(Book));

app.get('/', (req, res) => {
  res.send('welcome to my api!');
});


app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});

export default app;