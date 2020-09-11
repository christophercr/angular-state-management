import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {action} from "@datorama/akita";
import {tap} from 'rxjs/operators';
import {BookCollectionsStore} from './book-collections.store';
import {MediaCollection} from "../../shared/entities/media-collection.entity";
import {Book} from "../entities/book.entity";

@Injectable({providedIn: 'root'})
export class BookCollectionsService {

  constructor(private bookCollectionsStore: BookCollectionsStore, private http: HttpClient) {
  }

  get() {
    return this.http.get('').pipe(tap(entities => this.bookCollectionsStore.update(entities)));
  }

  @action('load Book Collection')
  loadBookCollection() {
    /* do nothing for now */
  }

  @action('Load Book Collection success')
  loadBookCollectionSuccess(collection: MediaCollection<Book>) {
    this.bookCollectionsStore.update(state => ({
      collections: [...state.collections, collection]
    }));
  }

  @action('Create Book')
  createBook(newBook: Book, collectionId: string) {
    this.bookCollectionsStore.update(state => {
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

      return {
        collections: newCollections
      };
    });
  }

  @action('Create Book success')
  createBookSuccess(modifiedCollection: MediaCollection<Book>) {
    /* do nothing for now */
  }

  @action('Create Book failure')
  createBookFailure(error: any) {
    /* do nothing for now */
  }
}
