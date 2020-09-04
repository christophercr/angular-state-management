import * as localForage from 'localforage';

import {Media} from '../entities/abstract-media.entity';
import {classToPlain, plainToClassFromExist} from 'class-transformer';
import {MediaCollection} from '../entities/media-collection.entity';
import {from, Observable, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

export abstract class MediaService<T extends Media> {

  protected readonly _store: LocalForage;

  constructor(private _type: Function) {
    console.log(`Initializing media service for ${_type.name}`);

    // each instance of the media service has its own data store: https://github.com/localForage/localForage
    // the initialization options are described here: https://localforage.github.io/localForage/#settings-api-config
    this._store = localForage.createInstance({
      name: 'mediaMan',
      version: 1.0,
      storeName: `media-man-${_type.name}`, // we add the type name to the object store name!
      description: 'MediaMan data store'
    });
  }

  loadMediaCollection(identifier: string): Observable<MediaCollection<T>> {
    console.log(`Trying to load media collection with the following identifier: ${identifier}`);
    return from(this._store.getItem(identifier)).pipe(
      map(value => {
        console.log('Found the collection: ', value);

        const retrievedCollection = plainToClassFromExist<MediaCollection<T>, unknown>(new MediaCollection<T>(this._type), value);

        console.log('Retrieved collection: ', retrievedCollection);

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

    const serializedVersion = classToPlain(collection, {excludePrefixes: ['_']});
    console.log('Serialized version: ', serializedVersion);

    return from(this._store.setItem(collection.identifier, serializedVersion)).pipe(
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
    return from(this._store.keys()).pipe(
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

    return from(this._store.removeItem(identifier)).pipe(
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
