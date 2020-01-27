import { SeriesActions, SeriesActionTypes } from './series.actions';
import { initialState, setSeriesFavourite } from './series.state';
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
    case SeriesActionTypes.ADD_FAVOURITE:
      return {
        ...state,
        series: setSeriesFavourite(state.series, action.payload, true),
      };
    case SeriesActionTypes.REMOVE_FAVOURITE:
      return {
        ...state,
        series: setSeriesFavourite(state.series, action.payload, false),
      };
    default:
      return state;
  }
}
