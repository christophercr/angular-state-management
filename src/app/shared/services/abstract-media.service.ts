import * as localForage from 'localforage';

import {Media} from '../entities/abstract-media.entity';
import {classToPlain, plainToClassFromExist} from 'class-transformer';
import {MediaCollection} from '../entities/media-collection.entity';
import {from, Observable, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {ObservableStore} from "@codewithdan/observable-store";
import {MediaStoreState} from "../store/media-store";

export abstract class MediaService<T extends Media> extends ObservableStore<MediaStoreState<T>> {

  protected readonly _storage: LocalForage;

  constructor(private _type: Function) {
    super({
      /* settings can be set here, although they are set globally in main.ts and those take precedence */
    });

    const initialState: MediaStoreState<T> = {
      collections: []
    };

    // second parameter, 'action', is just a label to tag this state change
    this.setState(initialState, 'INIT_STATE');
    console.log('---- state history', [...this.stateHistory]);

    console.log(`Initializing media service for ${_type.name}`);

    // each instance of the media service has its own data store: https://github.com/localForage/localForage
    // the initialization options are described here: https://localforage.github.io/localForage/#settings-api-config
    this._storage = localForage.createInstance({
      name: 'mediaMan',
      version: 1.0,
      storeName: `media-man-${_type.name}`, // we add the type name to the object store name!
      description: 'MediaMan data store'
    });
  }

  loadMediaCollection(identifier: string): Observable<MediaCollection<T>> {
    console.log(`Trying to load media collection with the following identifier: ${identifier}`);
    return from(this._storage.getItem(identifier)).pipe(
      map(value => {
        console.log('Found the collection: ', value);

        const retrievedCollection = plainToClassFromExist<MediaCollection<T>, unknown>(new MediaCollection<T>(this._type), value);

        console.log('Retrieved collection: ', retrievedCollection);

        const mutableState = this.getState();
        mutableState.collections = mutableState.collections.concat(retrievedCollection);
        this.setState({collections: mutableState.collections}, 'LOAD_COLLECTION_FROM_STORAGE');

        console.log('---- state history', [...this.stateHistory]);

        return retrievedCollection;
      }),
      catchError(err => {
        return throwError(err); // let the error through
      })
    );
  }

  saveMediaCollection(collection: Readonly<MediaCollection<T>>): Observable<void> {
    if (!collection) {
      return throwError(new Error('The list cannot be null or undefined!'));
    }

    console.log(`Saving media collection with the following name ${collection.name}`);

    const mutableState = this.getState();

    const existingCollectionIndex = mutableState.collections.findIndex((savedCollection) => {
      console.log('---- find', savedCollection.identifier, savedCollection.name, collection.identifier);
      return savedCollection.identifier === collection.identifier;
    })

    if (existingCollectionIndex !== -1) {
      console.log('----- collection already in state, replacing it');
      mutableState.collections.splice(existingCollectionIndex, 1, collection as MediaCollection<T>);
    } else {
      mutableState.collections.push(collection as MediaCollection<T>);
    }

    this.setState({collections: mutableState.collections}, 'SAVE_COLLECTION');

    console.log('----- state history', [...this.stateHistory]);

    const serializedVersion = classToPlain(collection, {excludePrefixes: ['_']});
    console.log('Serialized version: ', serializedVersion);

    return from(this._storage.setItem(collection.identifier, serializedVersion)).pipe(
      map(value => {
        console.log(`Saved the ${collection.name} collection successfully! Saved value: `, value);
        return;
      }),
      catchError(err => {
        console.error(`Failed to save the ${collection.name} collection with identifier ${collection.identifier}. Error: ${err}`);
        return throwError(err);
      })
    );
  }

  getMediaCollectionIdentifiersList(): Observable<string[]> {
    console.log('Retrieving the list of media collection identifiers');
    return from(this._storage.keys()).pipe(
      tap(keys => {
        console.log('Retrieved the of media collection identifiers: ', keys);
      }),
      catchError(err => {
        console.error('Failed to retrieve the list of media collection identifiers. Error: ', err);
        return throwError(err);
      })
    );
  }

  removeMediaCollection(identifier: string): Observable<void> {
    if (!identifier || '' === identifier.trim()) {
      return throwError(new Error('The identifier must be provided!'));
    }

    console.log(`Removing media collection with the following identifier ${identifier}`);

    const mutableState = this.getState();

    const updatedCollections = mutableState.collections.filter((collection) => {
      return collection.identifier === identifier;
    })

    this.setState({collections: updatedCollections}, 'REMOVE_COLLECTION');

    return from(this._storage.removeItem(identifier)).pipe(
      tap(() => {
        console.log(`Removed the ${identifier} collection successfully!`);
      }),
      catchError(err => {
        console.error(`Failed to removed the ${identifier} collection`);
        return throwError(err);
      })
    );
  }

  displayErrorMessage(errorMessage: string): void {
    if (!errorMessage) {
      throw new Error('An error message must be provided!');
    }
    alert(errorMessage); // bad user experience but ignore this for now
  }
}
