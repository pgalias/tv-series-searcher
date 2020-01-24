import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './series.state';

export const selectSeriesState = createFeatureSelector<State>('series');
export const selectSeries = createSelector(selectSeriesState, (state: State) => state.series);
