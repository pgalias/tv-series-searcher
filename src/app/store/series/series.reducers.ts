import { uniqWith, isEqual } from 'lodash';
import { SeriesActions, SeriesActionTypes } from './series.actions';
import { initialState } from './series.state';
import { Flags } from '../../shared/models/flags';
import { Series } from '../../shared/models/series';

export function reducer(state = initialState, action: SeriesActions) {
  switch (action.type) {
    case SeriesActionTypes.FETCH_SERIES_PENDING:
      return {
        ...state,
        flags: Flags.loading(),
      };
    case SeriesActionTypes.FETCH_SERIES_SUCCESS:
      return {
        ...state,
        series: action.payload,
        flags: Flags.loaded(),
      };
    case SeriesActionTypes.FETCH_SERIES_FAILURE:
      return {
        ...state,
        series: [],
        flags: Flags.error(),
      };
    case SeriesActionTypes.ADD_FAVOURITE:
      return {
        ...state,
        favourites: uniqWith([
          ...state.favourites,
          action.payload,
        ], isEqual),
      };
    case SeriesActionTypes.REMOVE_FAVOURITE:
      return {
        ...state,
        favourites: state.favourites.filter((series: Series) => series.id === action.payload.id)
      };
    default:
      return state;
  }
}
