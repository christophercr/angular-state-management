import * as fromCreateBookCollection from './create-book-collection.actions';

describe('createBookCollection', () => {
  it('should return an action', () => {
    expect(fromCreateBookCollection.createBookCollection().type).toBe('[CreateBookCollection] CreateBookCollection');
  });
});
