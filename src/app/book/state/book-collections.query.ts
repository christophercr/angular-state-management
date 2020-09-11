import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {BookCollectionsState, BookCollectionsStore} from './book-collections.store';

@Injectable({providedIn: 'root'})
export class BookCollectionsQuery extends Query<BookCollectionsState> {

  bookCollections$ = this.select(state => {
    return state.collections;
  });

  constructor(protected store: BookCollectionsStore) {
    super(store);
  }

}
