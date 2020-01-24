import { reducer } from './series.reducers';
import { initialState } from './series.state';
import {
  FetchSeriesPending,
  FetchSeriesSuccess,
  FetchSeriesFailure
} from './series.actions';
import { Series } from '../../shared/models/series';

describe('Series reducer', () => {
  const series = [new Series()];

  it('SeriesActions.FetchSeriesPending should set loading state to true', () => {
    const action = new FetchSeriesPending('girls');
    const newState = reducer(initialState, action);
    const expected = { ...initialState, loading: true };

    expect(newState).toEqual(expected);
  });

  it('SeriesActions.FetchSeriesSuccess should store series list and set loading state to false', () => {
    const currentState = {
      ...initialState,
      loading: true,
    };
    const action = new FetchSeriesSuccess(series);
    const newState = reducer(currentState, action);
    const expected = { ...initialState, series, loading: false };

    expect(newState).toEqual(expected);
  });

  it('SeriesActions.FetchSeriesFailure should clear series list and set loading state to false', () => {
    const currentState = {
      ...initialState,
      series,
    };
    const action = new FetchSeriesFailure();
    const newState = reducer(currentState, action);
    const expected = { ...initialState, series: [], loading: false, error: true };

    expect(newState).toEqual(expected);
  });
});
