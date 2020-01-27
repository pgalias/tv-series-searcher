import { reducer } from './filters.reducers';
import {initialState} from './filters.state';
import {
  SetPhrase,
  ClearPhrase,
  SetPageNumber,
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

  describe('Page actions', () => {
    describe('FiltersActions.SetPageNumber', () => {
      it('should save current page number to store', () => {
        const action = new SetPageNumber(4);
        const newState = reducer(initialState, action);
        const expected = { ...initialState, pageNumber: 4 };

        expect(newState).toEqual(expected);
      });

      it('should prevent to set page number lower than 1', () => {
        const currentState = {
          ...initialState,
          pageNumber: 2,
        };
        const action = new SetPageNumber(-1);
        const newState = reducer(currentState, action);
        const expected = { ...initialState, pageNumber: 1 };

        expect(newState).toEqual(expected);
      });
    });
  });
});
