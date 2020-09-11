import {createAction, props} from '@ngrx/store';

export const removeBook = createAction(
  '[RemoveBook] RemoveBook'
);

export const removeBookSuccess = createAction(
  '[RemoveBook] RemoveBook Success',
  props<{ data: any }>()
);

export const removeBookFailure = createAction(
  '[RemoveBook] RemoveBook Failure',
  props<{ error: any }>()
);
