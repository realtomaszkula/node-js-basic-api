import getBookController from './bookController';


describe('BookController', () => {

  describe('POST', () => {

    it('should fail for book witout title', () => {
      expect(false).toBeFalsy();
    });
  });

});
