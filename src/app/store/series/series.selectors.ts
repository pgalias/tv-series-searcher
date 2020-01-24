import { createSelector } from '@ngrx/store';
import { State as AppState } from '../index';
import { State } from './series.state';

export const selectSeries = (state: AppState) => state.series;
export const getSeries = createSelector(selectSeries, (state: State) => state.series);
