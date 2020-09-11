import {createReducer, on} from '@ngrx/store';
import {MediaCollection} from "../../shared/entities/media-collection.entity";
import {Book} from "../entities/book.entity";
import {
  loadBookCollection,
  loadBookCollectionFailure,
  loadBookCollectionSuccess
} from "../actions/load-book-collection.actions";
import {createBook} from "../actions/create-book.actions";

export const bookCollectionsFeatureKey = 'bookCollections';

export interface State {
  collections: MediaCollection<Book>[]
}

export const initialState: State = {
  collections: []
};


export const reducer = createReducer(
  initialState,
  // loadBookCollection
  on(loadBookCollection, state => state), // state unchanged
  on(loadBookCollectionSuccess, (state, {loadedCollection}) => ({
    ...state,
    collections: [...state.collections, loadedCollection]
  })),
  on(loadBookCollectionFailure, state => state), // state unchanged

  // createBook
  on(createBook, (state, {newBook, collectionId}) => {
    const existingCollectionIndex = state.collections.findIndex((collection) => {
      return collection.identifier === collectionId;
    });

    // existing collection is immutable!
    const existingCollection = state.collections[existingCollectionIndex];
    // create a new mutable collection
    const modifiedCollection = new MediaCollection<Book>(Book, existingCollection.name, existingCollection.identifier);
    modifiedCollection.collection = [...existingCollection.collection, newBook];
    // create a new mutable array of collections!
    const newCollections = [...state.collections];
    newCollections.splice(existingCollectionIndex, 1, modifiedCollection);

    const newState = {
      ...state,
      collections: newCollections
    }

    return newState;
  }),
);

