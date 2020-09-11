import {createAction, props} from '@ngrx/store';

export const removeBookCollection = createAction(
  '[RemoveBookCollection] RemoveBookCollection'
);

export const removeBookCollectionSuccess = createAction(
  '[RemoveBookCollection] RemoveBookCollection Success',
  props<{ data: any }>()
);

export const removeBookCollectionFailure = createAction(
  '[RemoveBookCollection] RemoveBookCollection Failure',
  props<{ error: any }>()
);
