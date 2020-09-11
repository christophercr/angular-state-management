import * as fromRemoveBookCollection from './remove-book-collection.actions';

describe('removeBookCollection', () => {
  it('should return an action', () => {
    expect(fromRemoveBookCollection.removeBookCollection().type).toBe('[RemoveBookCollection] RemoveBookCollection');
  });
});
