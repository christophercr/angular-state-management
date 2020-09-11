import {ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import * as fromBookCollections from './book-collections.reducer';
import {bookCollectionsFeatureKey} from './book-collections.reducer';

export const bookFeatureKey = 'book';

export interface State {

  [fromBookCollections.bookCollectionsFeatureKey]: fromBookCollections.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromBookCollections.bookCollectionsFeatureKey]: fromBookCollections.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];


export const selectFeature = createFeatureSelector<State>(bookFeatureKey);

export const selectBookCollections = createSelector(
  selectFeature,
  (state: State) => state[bookCollectionsFeatureKey]
);
