import { initialState } from './filters.state';
import { FiltersActions, FiltersActionsTypes } from './filters.actions';

export function reducer(state = initialState, action: FiltersActions) {
  switch (action.type) {
    case FiltersActionsTypes.SET_PHRASE:
      return {
        ...state,
        phrase: action.payload,
      };
    case FiltersActionsTypes.CLEAR_PHRASE:
      return {
        ...state,
        phrase: initialState.phrase,
      };
    default:
      return state;
  }
}
