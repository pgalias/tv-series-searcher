import { reducer } from './series.reducers';
import { initialState } from './series.state';
import {
  FetchSeriesPending,
  FetchSeriesSuccess,
  FetchSeriesFailure
} from './series.actions';
import { Series } from '../../shared/models/series';

describe('Series reducer', () => {
  const series = [Object.assign(
    new Series(),
    {
      id: 139,
      cover: 'http://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg',
      name: 'Girls',
      rating: 6.9,
      summary: `<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in
                    their 20s.</p>`,
      genres: [
        'Drama',
        'Romance',
      ],
      external: 'tt1723816'
    }
  )];

  it('SeriesActions.FetchSeriesPending should set loading state to true', () => {
    const action = new FetchSeriesPending();
    const newState = reducer(initialState, action);
    const expected = { ...initialState, loading: true };

    expect(newState).toEqual(expected);
  });

  it('SeriesActions.FetchSeriesSuccess should store series list and set loading state to false', () => {
    const action = new FetchSeriesSuccess(series);
    const newState = reducer(initialState, action);
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
    const expected = { ...initialState, series: [], loading: false };

    expect(newState).toEqual(expected);
  });
});
