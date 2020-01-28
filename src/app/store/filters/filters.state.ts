import { STORAGE_PAGE_NUMBER_KEY, STORAGE_PHRASE_KEY } from '../../core/storage/storage.service';

export interface State {
  phrase: string;
  pageNumber: number;
  perPage: number;
}

export const initialState: State = {
  phrase: JSON.parse(localStorage.getItem(STORAGE_PHRASE_KEY)),
  pageNumber: JSON.parse(localStorage.getItem(STORAGE_PAGE_NUMBER_KEY)) || 1,
  perPage: 20,
};
