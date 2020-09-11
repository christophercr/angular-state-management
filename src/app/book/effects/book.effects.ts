import {Injectable} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from "rxjs";
import {catchError, concatMap, map, mergeMap, withLatestFrom} from "rxjs/operators";
import {createBook, createBookFailure, createBookSuccess} from "../actions/create-book.actions";
import {BookService} from "../services/book.service";
import {selectBookCollections, State} from "../reducers";

@Injectable()
export class BookEffects {

  constructor(private actions$: Actions, private bookService: BookService, private store: Store<State>) {
    console.log('--- BookEffects instantiated!');
  }

  createBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createBook),
      concatMap(action => of(action).pipe(
        // get the collections from the state
        withLatestFrom(this.store.pipe(select(selectBookCollections),
          map((bookCollectionsState) => {
            const modifiedCollection = bookCollectionsState.collections.find((collection) => {
              return collection.identifier === action.collectionId;
            });
            console.log('--- saving bookCollection', modifiedCollection);
            return modifiedCollection;
          })
        ))
      )),
      mergeMap(([action, modifiedCollection]) => this.bookService.saveMediaCollection(modifiedCollection).pipe(
        map(() => {
          console.log('--- bookCollection saved!');
          return createBookSuccess({data: modifiedCollection})
        }),
        catchError((error) => {
          const errorMsg = `Error while updating an existing book collection: ${error}`;
          console.log(errorMsg);
          return of(createBookFailure({error: errorMsg}))
        })
        )
      ),
    );
  })

}
