import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
  CreateBookAction,
  CreateBookSuccessAction,
  LoadBookCollectionAction,
  LoadBookCollectionSuccessAction,
} from './book-collections.actions';
import {MediaCollection} from "../../shared/entities/media-collection.entity";
import {Book} from "../entities/book.entity";

export class BookCollectionsStateModel {
  public collections: MediaCollection<Book>[];
}

const defaults = {
  collections: []
};

@State<BookCollectionsStateModel>({
  name: 'bookCollections',
  defaults
})
@Injectable()
export class BookCollectionsState {
  @Selector()
  static collections(state: BookCollectionsStateModel) {
    return state.collections;
  }

  @Action(LoadBookCollectionAction)
  loadCollection(ctx: StateContext<BookCollectionsStateModel>) {
    const state = ctx.getState();
    console.log('---- loadCollection: current state', state);
    // no state changes, just for demo purposes
  }

  @Action(LoadBookCollectionSuccessAction)
  loadCollectionSuccess(ctx: StateContext<BookCollectionsStateModel>, {collection}: LoadBookCollectionSuccessAction) {
    const state = ctx.getState();
    ctx.setState({collections: [...state.collections, collection]});
  }

  @Action(CreateBookAction)
  createBook(ctx: StateContext<BookCollectionsStateModel>, {newBook, collectionId}: CreateBookAction) {
    const state = ctx.getState();

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

    ctx.setState({collections: newCollections});

    ctx.dispatch(new CreateBookSuccessAction(modifiedCollection));
  }
}
