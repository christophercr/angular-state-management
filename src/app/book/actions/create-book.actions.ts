import {createAction, props} from '@ngrx/store';
import {Book} from "../entities/book.entity";

export const createBook = createAction(
  '[CreateBook] CreateBook',
  props<{ newBook: Book, collectionId: string }>()
);

export const createBookSuccess = createAction(
  '[CreateBook] CreateBook Success',
  props<{ data: any }>()
);

export const createBookFailure = createAction(
  '[CreateBook] CreateBook Failure',
  props<{ error: any }>()
);
