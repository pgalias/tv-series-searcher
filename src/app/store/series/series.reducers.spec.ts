import { reducer } from './series.reducers';
import { initialState } from './series.state';
import {
  FetchSeriesPending,
  FetchSeriesSuccess,
  FetchSeriesFailure
} from './series.actions';
import { Series } from '../../shared/models/series';
import { Flags } from '../../shared/models/flags';

describe('Series reducer', () => {
  const series = [new Series()];

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
