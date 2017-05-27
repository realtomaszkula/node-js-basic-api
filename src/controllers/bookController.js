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
  const index = (req, res) => {
    let query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query)
      .then((books) => {
        const returnBooks = books.reduce(addLinks(req), []);
        res.json(returnBooks);
      })
      .catch((e) => {
        console.error(e);
        res.status(500).send(e)
      })
  };

  const create = (req, res) => {
    req.host
    if (!req.body.title) {
      res.status(400).send('Title is required');
    } else {
      const book = new Book(req.body);
      book.save();
      res.status(201).send(book);
    }
  };

  const show = (req, res) => res.json(req.book);

  const put = (req, res) => {
    const {
      book,
      body
    } = req;

    Object.entries(body)
      .forEach(([k, v]) => book[k] = v)

    book.save()
      .then(book => res.json(book))
      .catch(e => res.status(500).send(e));
  }


  const patch = (req, res) => {
    const {
      book,
      body
    } = req;

    if (body._id) {
      delete body._id;
    }

    Object.entries(body)
      .forEach(([k, v]) => book[k] = v);

    book.save()
      .then(book => res.json(book))
      .catch(e => res.status(500).send(e));
  }
  const destroy = (req, res) => {
    req.book.remove()
      .then(() => res.status(204).send('Removed'))
      .catch((e) => res.status(500).send(e));
  }


  return {
    index,
    create,
    show,
    put,
    patch,
    destroy,
  }
}