import {async, TestBed} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {BookCollectionsState} from './book-collections.state';
import {CreateBookSuccessAction} from './book-collections.actions';
import {Book} from "../entities/book.entity";
import {MediaCollection} from "../../shared/entities/media-collection.entity";

describe('BookCollections actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([BookCollectionsState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const modifiedCollection = new MediaCollection<Book>(Book);
    store.dispatch(new CreateBookSuccessAction(modifiedCollection));
    store.select(state => state.bookCollections.items).subscribe((items: string[]) => {
      expect(items).toEqual(jasmine.objectContaining([modifiedCollection]));
    });
  });

});
