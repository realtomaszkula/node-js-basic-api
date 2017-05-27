import express from 'express';
import getBookController from '../controllers/bookController';

export default (Book) => {
  const bookRouter = express.Router();
  const bookController = getBookController(Book);

  bookRouter.route('/')
    .get(bookController.index)
    .post(bookController.create);

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
    .get(bookController.show)
    .put(bookController.put)
    .patch(bookController.patch)
    .delete(bookController.destroy)

  return bookRouter;
}