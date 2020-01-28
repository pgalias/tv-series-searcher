import { SeriesActions, SeriesActionTypes } from './series.actions';
import { initialState } from './series.state';
import { Flags } from '../../shared/models/flags';
import { removeFromCollection, saveUniqueToCollection } from '../../shared/helpers/store.helper';

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
        favourites: saveUniqueToCollection(state.favourites, action.payload),
      };
    case SeriesActionTypes.REMOVE_FAVOURITE:
      return {
        ...state,
        favourites: removeFromCollection(state.favourites, action.payload, 'id'),
      };
    default:
      return state;
  }
}
