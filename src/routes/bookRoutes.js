import express from 'express';
import getBookController from '../controllers/bookController';

export default (Book) => {
  const bookRouter = express.Router();
  const bookController = getBookController(Book);

  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

  bookRouter.use('/:id', (req, res, next) => {
    Book.findById(req.params.id)
      .then((book) => {
        if (book) {
          req.book = book;
          next();
        } else {
          res.status(404).send('no book found');
        }
      })
      .catch((e) => res.status(500).send(e));
  });

  bookRouter.route('/:id')
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      const { book, body } = req;

      Object.entries(body)
        .forEach(([k, v]) => book[k] = v)

      book.save()
        .then(book => res.json(book))
        .catch(e => res.status(500).send(e));
    })
    .patch((req, res) => {
      const { book, body } = req;

       if (body._id) {
        delete body._id;
      }

      Object.entries(body)
            .forEach(([k, v]) => book[k] = v);

      book.save()
        .then(book => res.json(book))
        .catch(e => res.status(500).send(e));
    })
    .delete((req, res) => {
      req.book.remove()
        .then(() => res.status(204).send('Removed'))
        .catch((e) => res.status(500).send(e));
    })

  return bookRouter;
}