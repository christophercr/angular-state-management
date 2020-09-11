import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';

export interface State {
  // empty root state
}
export const reducers: ActionReducerMap<State> = {};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
