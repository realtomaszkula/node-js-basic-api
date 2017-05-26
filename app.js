import express from 'express';
import mongoose from 'mongoose';
import Book from './models/bookModel';

const db = mongoose.connect('mongodb://localhost/bookAPI');

const app = express();

const port = process.env.PORT || 3000;

const bookRouter = express.Router();

bookRouter.route('/books')
  .get((req, res) => {
    Book.find()
      .then((books) => res.json(books))
      .catch((e) => res.status(500).send(e));
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my api!');
});


app.listen(port, () => {
  console.log(`Running on port: ${port}`);
})