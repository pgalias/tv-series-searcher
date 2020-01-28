import { createSelector } from '@ngrx/store';
import { SeriesSelectors } from './series';
import { FiltersSelectors } from './filters';
import { Series } from '../shared/models/series';

export const selectSeriesByPage = createSelector(
  SeriesSelectors.selectSeries,
  FiltersSelectors.selectCurrentPage,
  (series: Series[][], pageNumber: number) => series[pageNumber - 1]
);

export const selectMaxPages = createSelector(
  SeriesSelectors.selectSeries,
  (series: Series[][]) => series.length
);
