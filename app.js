import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bookRouter from './routes/bookRoutes';
import Book from './models/bookModel';

mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost/bookAPI');

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
})