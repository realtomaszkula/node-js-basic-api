import getBookController from './bookController';

describe('BookController', () => {

  describe('POST', () => {
    it('should fail for book witout title', () => {
      const book = function Book(book) { this.save = () => {} };

      const req = {
        body: {
          author: 'I am missing a title'
        }
      };

      function sendFn(obj) { return this };
      function statusFn(code) { return this };

      const res = {
        status: statusFn,
        send: sendFn,
      }

      spyOn(res, 'send').and.callThrough();
      spyOn(res, 'status').and.callThrough();

      const controller = getBookController(book);

      controller.post(req, res);

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Title is required');
    });
  });

});
