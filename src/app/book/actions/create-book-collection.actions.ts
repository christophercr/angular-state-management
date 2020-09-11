import {createAction, props} from '@ngrx/store';

export const createBookCollection = createAction(
  '[CreateBookCollection] CreateBookCollection'
);

export const createBookCollectionSuccess = createAction(
  '[CreateBookCollection] CreateBookCollection Success',
  props<{ data: any }>()
);

export const createBookCollectionFailure = createAction(
  '[CreateBookCollection] CreateBookCollection Failure',
  props<{ error: any }>()
);
