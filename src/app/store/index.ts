import { ActionReducerMap } from '@ngrx/store';
import * as Series from './series';

/* States */
export interface State {
  series: Series.State;
}

/* Reducers */
export const reducers: ActionReducerMap<State> = {
  series: Series.reducer,
};

/* Selectors */
export * from './series/series.selectors';
