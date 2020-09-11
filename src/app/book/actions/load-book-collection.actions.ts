import {createAction, props} from '@ngrx/store';
import {MediaCollection} from "../../shared/entities/media-collection.entity";
import {Book} from "../entities/book.entity";

export const loadBookCollection = createAction(
  '[LoadBookCollection] LoadBookCollection'
);

export const loadBookCollectionSuccess = createAction(
  '[LoadBookCollection] LoadBookCollection Success',
  props<{ loadedCollection: MediaCollection<Book> }>()
);

export const loadBookCollectionFailure = createAction(
  '[LoadBookCollection] LoadBookCollection Failure',
  props<{ error: any }>()
);
