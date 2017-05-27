export default (Book) => {
  const post = (req, res) => {

    if (!req.body.title) {
      res.status(400).send('Title is required');
    } else {
      const book = new Book(req.body);
      book.save();
      res.status(201).send(book);
    }
  }

  const get = (req, res) => {

    let query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query)
      .then((books) => res.json(books))
      .catch((e) => res.status(500).send(e));
  }

  return {
    post,
    get
  }
}