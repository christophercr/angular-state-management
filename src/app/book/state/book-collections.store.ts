import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {MediaCollection} from "../../shared/entities/media-collection.entity";
import {Book} from "../entities/book.entity";

export interface BookCollectionsState {
  collections: MediaCollection<Book>[];
}

export function createInitialState(): BookCollectionsState {
  return {
    collections: []
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'bookCollections'})
export class BookCollectionsStore extends Store<BookCollectionsState> {

  constructor() {
    super(createInitialState());
  }
}
