import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {storeLogger} from "ngrx-store-logger";
import {environment} from '../../environments/environment';

export interface State {
  // empty root state
}

export const reducers: ActionReducerMap<State> = {};

// console.log all actions
export function logger(reducer: ActionReducer<State>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];
