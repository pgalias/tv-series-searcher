import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './series.state';
import { Series } from '../../shared/models/series';

export const selectSeriesState = createFeatureSelector<State>('series');
export const selectSeries = createSelector(selectSeriesState, (state: State) => state.series);
export const selectSeriesFlags = createSelector(selectSeriesState, (state: State) => state.flags);
export const selectFavorite = createSelector(
  selectSeriesState,
  (state: State) => state.series.filter((series: Series) => series.isFavourite)
);
