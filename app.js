import express from 'express';
import mongoose from 'mongoose';
import Book from './models/bookModel';

const db = mongoose.connect('mongodb://localhost/bookAPI');

const app = express();

const port = process.env.PORT || 3000;

const bookRouter = express.Router();

bookRouter.route('/books')
  .get((req, res) => {

    let query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query)
      .then((books) => res.json(books))
      .catch((e) => res.status(500).send(e));
  });

bookRouter.route('/books/:id')
  .get((req, res) => {

    Book.findById(req.params.id)
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