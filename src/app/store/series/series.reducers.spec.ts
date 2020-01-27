import { reducer } from './series.reducers';
import { initialState } from './series.state';
import {
  FetchSeriesPending,
  FetchSeriesSuccess,
  FetchSeriesFailure, AddFavourite, RemoveFavourite
} from './series.actions';
import { Series } from '../../shared/models/series';
import { Flags } from '../../shared/models/flags';
import { createSeries } from '../../shared/helpers/tests.helper';

describe('Series reducer', () => {
  const series = [new Series()];

  describe('Series Fetch Actions', () => {
    it('SeriesActions.FetchSeriesPending should set loading state to true', () => {
      const action = new FetchSeriesPending('girls');
      const newState = reducer(initialState, action);
      const expected = { ...initialState, flags: Flags.loading() };

      expect(newState).toEqual(expected);
    });

    it('SeriesActions.FetchSeriesSuccess should store series list and set loading state to false', () => {
      const currentState = {
        ...initialState,
        flags: Flags.loading(),
      };
      const action = new FetchSeriesSuccess(series);
      const newState = reducer(currentState, action);
      const expected = { ...initialState, series, flags: Flags.loaded() };

      expect(newState).toEqual(expected);
    });

    it('SeriesActions.FetchSeriesFailure should clear series list and set loading state to false', () => {
      const currentState = {
        ...initialState,
        series,
      };
      const action = new FetchSeriesFailure();
      const newState = reducer(currentState, action);
      const expected = { ...initialState, series: [], flags: Flags.error() };

      expect(newState).toEqual(expected);
    });
  });

  describe('Favourite Series Actions', () => {
    describe('SeriesActions.AddFavourite', () => {
      it('should add series to collection', () => {
        const currentState = {
          ...initialState,
          series: [
            createSeries({ id: 123, isFavourite: false }),
            createSeries({ id: 234, isFavourite: false }),
          ],
        };

        const action = new AddFavourite(234);
        const newState = reducer(currentState, action);
        const expected = { ...initialState, series: [
          createSeries({ id: 123, isFavourite: false }),
          createSeries({ id: 234, isFavourite: true }),
        ]};

        expect(newState).toEqual(expected);
      });
    });

    describe('SeriesActions.RemoveFavourite', () => {
      it('should remove series from collection', () => {
        const currentState = {
          ...initialState,
          series: [
            createSeries({ id: 123, isFavourite: true }),
            createSeries({ id: 234, isFavourite: true }),
          ],
        };

        const action = new RemoveFavourite(234);
        const newState = reducer(currentState, action);
        const expected = { ...initialState, series: [
            createSeries({ id: 123, isFavourite: true }),
            createSeries({ id: 234, isFavourite: false }),
        ]};

        expect(newState).toEqual(expected);
      });

      it('should works when even series is not in collection', () => {
        const currentState = {
          ...initialState,
          series: [ createSeries({ id: 123, isFavourite: true }) ],
        };

        const action = new RemoveFavourite(321);
        const newState = reducer(currentState, action);
        const expected = { ...initialState, series: currentState.series};

        expect(newState).toEqual(expected);
      });
    });
  });
});
