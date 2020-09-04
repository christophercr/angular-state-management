import {Injectable, OnDestroy} from '@angular/core';
import {MediaService} from '../../shared/services/abstract-media.service';
import {Book} from '../entities/book.entity';
import {MediaCollection} from '../../shared/entities/media-collection.entity';
import {forkJoin, Observable, Subscription} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BookService extends MediaService<Book> implements OnDestroy {
  private _bookCollections: Map<string, MediaCollection<Book>> = new Map<string, MediaCollection<Book>>();
  private storeSubs: Subscription;

  constructor() {
    super(Book)

    this.storeSubs = this.stateChanged.subscribe((newState) => {
      this._bookCollections = this.createBookCollectionsMap(newState.collections);
    })
  }

  ngOnDestroy() {
    this.storeSubs.unsubscribe();
  }

  private createBookCollectionsMap(collections: MediaCollection<Book>[]): Map<string, MediaCollection<Book>> {
    const bookCollectionsMap = new Map<string, MediaCollection<Book>>();

    for (const collection of collections) {
      // we need to re-create the MediaCollection object cause the ObservableStore just works with objects (not classes)
      // so the instance methods are no longer there!
      const rehydratedCollection = new MediaCollection<Book>(Book, collection.name, collection.identifier);
      rehydratedCollection.collection = collection.collection;

      bookCollectionsMap.set(collection.identifier, rehydratedCollection);
    }

    return bookCollectionsMap;
  }

  get bookCollections$(): Observable<Map<string, MediaCollection<Book>>> {
    return this.stateChanged.pipe(
      map((newState) => {
        return this.createBookCollectionsMap(newState.collections);
      })
    )
  }

  reloadBookCollections(): void {
    this.getMediaCollectionIdentifiersList().pipe(
      switchMap(keys => {

        const loadMediaCollections$ = keys.map(key => {
          return this.loadMediaCollection(key);
        })

        return forkJoin(loadMediaCollections$);
      })
    ).subscribe();
  }

  createBookCollection(name: string): void {
    console.log('Creating a new book collection: ', name);

    const newBookCollection: MediaCollection<Book> = new MediaCollection<Book>(Book, name);

    this.saveMediaCollection(newBookCollection).subscribe({
      next: () => {
        console.log(`New book collection called "${newBookCollection.name}" saved successfully. Identifier: `, newBookCollection.identifier);
      },
      error: _ => {
        this.displayErrorMessage(`Failed to save the new book collection called ${name}`);
      }
    });
  }

  removeBookCollection(identifier: string): void {
    if (!identifier) {
      throw new Error('An identifier must be provided');
    }

    this.removeMediaCollection(identifier).subscribe({
      next: () => {
        console.log('Removed the collection with identifier: ', identifier);
      },
      error: _ => {
        this.displayErrorMessage('Failed to remove the collection!');
      }
    });
  }

  createBook(collectionIdentifier: string, book: Book): void {
    if (!collectionIdentifier) {
      throw new Error('The collection identifier is required to create a new book!');
    }

    if (!this._bookCollections.has(collectionIdentifier) || !this._bookCollections.get(collectionIdentifier)) {
      console.error('Tried to add a book to an unknown collection. Identifier: ', collectionIdentifier);
      this.displayErrorMessage('Failed to create the new book!');
      return;
    }

    const existingCollection = this._bookCollections.get(collectionIdentifier);
    if (!existingCollection || !book) {
      throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
    }

    existingCollection.addMedia(book);

    this.saveMediaCollection(existingCollection)
      .subscribe({
        next: () => {
          console.log(`Book collection called "${existingCollection.name}" updated successfully.`);
        },
        error: error => {
          console.error('Error while updating an existing book collection: ', error);
          this.displayErrorMessage(`Failed to update the existing book collection called ${existingCollection.name}`);
        }
      });
  }

  removeBook(collectionIdentifier: string, bookIdentifier: string) {
    if (!collectionIdentifier) {
      throw new Error('The collection identifier must be provided!');
    }

    if (!bookIdentifier) {
      throw new Error('The book identifier must be provided!');
    }

    console.log(`Removing book ${bookIdentifier} which should be part of collection ${collectionIdentifier}`);

    const existingCollection = this._bookCollections.get(collectionIdentifier);
    if (!existingCollection) {
      throw new Error("The collection couldn't be retrieved or we could not get the book details from the view!");
    }

    existingCollection.removeMedia(bookIdentifier);

    this.saveMediaCollection(existingCollection)
      .subscribe({
        next: () => {
          console.log(`Book collection called "${existingCollection.name}" updated successfully.`);
        },
        error: error => {
          console.error('Error while updating an existing book collection: ', error);
          this.displayErrorMessage(`Failed to save the modifications made to the ${existingCollection.name} book collection (removal of the following book: ${bookIdentifier}`);
        }
      });
  }
}
