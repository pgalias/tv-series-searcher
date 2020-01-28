import { createSelector } from '@ngrx/store';
import { find } from 'lodash';
import { SeriesSelectors } from './series';
import { FiltersSelectors } from './filters';
import { Series } from '../shared/models/series';

export const selectSeriesByPage = createSelector(
  SeriesSelectors.selectSeries,
  SeriesSelectors.selectFavorite,
  FiltersSelectors.selectCurrentPage,
  (series: Series[][], favouriteSeries: Series[], pageNumber: number) => {
    if (!series || !series[pageNumber - 1]) {
      return [];
    }

    return series[pageNumber - 1].map((serie: Series) => find(favouriteSeries, ['id', serie.id]) ?
      Object.assign(new Series(), serie, { isFavourite: true })
      : serie
    );
  }
);

export const selectMaxPages = createSelector(
  SeriesSelectors.selectSeries,
  (series: Series[][]) => series.length
);
