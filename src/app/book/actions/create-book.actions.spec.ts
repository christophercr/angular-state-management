import * as fromCreateBook from './create-book.actions';
import {Book} from "../entities/book.entity";
import {Genre} from "../../shared/enums/genre.enum";

describe('createBook', () => {
  it('should return an action', () => {
    const book = new Book(
      'name',
      'description',
      'pictureLocation',
      Genre.Fiction,
      'author',
      120);
    expect(fromCreateBook.createBook({newBook: book, collectionId: 'some-id'}).type).toBe('[CreateBook] CreateBook');
  });
});
