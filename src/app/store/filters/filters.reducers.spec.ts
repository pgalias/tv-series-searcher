import { reducer } from './filters.reducers';
import {initialState} from './filters.state';
import {
  SetPhrase,
  ClearPhrase,
} from './filters.actions';

describe('Filters reducer', () => {
  describe('Phrase actions', () => {
    it('FiltersActions.SetPhrase should store phrase', () => {
      const action = new SetPhrase('Foo');
      const newState = reducer(initialState, action);
      const expected = { ...initialState, phrase: 'Foo' };

      expect(newState).toEqual(expected);
    });

    it('FiltersActions.ClearPhrase should remove phrase to store', () => {
      const currentState = {
        ...initialState,
        phrase: 'Bar',
      };
      const action = new ClearPhrase();
      const newState = reducer(currentState, action);
      const expected = { ...currentState, phrase: null };

      expect(newState).toEqual(expected);
    });
  });
});
