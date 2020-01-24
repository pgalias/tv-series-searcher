import { SeriesActions, SeriesActionTypes } from './series.actions';
import { initialState } from './series.state';

export function reducer(state = initialState, action: SeriesActions) {
  switch (action.type) {
    case SeriesActionTypes.FETCH_SERIES_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SeriesActionTypes.FETCH_SERIES_SUCCESS:
      return {
        ...state,
        series: action.payload,
        loading: false,
      };
    case SeriesActionTypes.FETCH_SERIES_FAILURE:
      return {
        ...state,
        series: [],
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
