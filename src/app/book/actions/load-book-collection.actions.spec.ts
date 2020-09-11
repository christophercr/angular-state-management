import * as fromLoadBookCollection from './load-book-collection.actions';

describe('loadBookCollection', () => {
  it('should return an action', () => {
    expect(fromLoadBookCollection.loadBookCollection().type).toBe('[LoadBookCollection] LoadBookCollection');
  });
});
