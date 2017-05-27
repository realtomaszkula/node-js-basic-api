import app from '../src/app';
import request from 'supertest';
import mongoose from 'mongoose';

const agent = request.agent(app);
const Book = mongoose.model('Book');

describe('Book CRUD Test', () => {
  it('should allow a book to be posted and return a read and _id', (done) => {
    const book = {title: 'new book', author: 'Tomasz', genre: 'fiction'};

    agent.post('/api/books')
      .send(book)
      .expect(200)
      .end((err, result) => {
        const {body} = result;

        expect(body.read).toBeFalsy();
        expect(body._id).toBeDefined();
        done();
      });
  });

  afterAll((done) => {
    Book.remove().then(done)
  })
});
