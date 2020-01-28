import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './filters.state';

export const selectFiltersState = createFeatureSelector<State>('filters');
export const selectPhrase = createSelector(selectFiltersState, (state: State) => state.phrase);
export const selectCurrentPage = createSelector(selectFiltersState, (state: State) => state.pageNumber);
