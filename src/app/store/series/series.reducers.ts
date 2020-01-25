import { SeriesActions, SeriesActionTypes } from './series.actions';
import { initialState } from './series.state';
import { Flags } from '../../shared/models/flags';

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
    default:
      return state;
  }
}
