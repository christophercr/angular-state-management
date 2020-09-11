import * as fromRemoveBook from './remove-book.actions';

describe('removeBook', () => {
  it('should return an action', () => {
    expect(fromRemoveBook.removeBook().type).toBe('[RemoveBook] RemoveBook');
  });
});
