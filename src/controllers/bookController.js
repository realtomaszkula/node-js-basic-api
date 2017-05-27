const addLinks = (req) => (acc, book) => {
  const hostname = req.headers.host;
  const newBook = {
    ...book.toJSON(),
    links: {
      self: `http://${hostname}/api/books/${book._id}`
    }
  };

  acc.push(newBook);
  return acc;
}

export default (Book) => {
  const post = (req, res) => {
    req.host
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
      .then((books) => {
        const returnBooks = books.reduce(addLinks(req), []);
        res.json(returnBooks);
      })
      .catch((e) =>{
        console.error(e);
         res.status(500).send(e)
      })
  }

  return {
    post,
    get
  }
}