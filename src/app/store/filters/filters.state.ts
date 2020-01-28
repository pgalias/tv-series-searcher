import { STORAGE_PHRASE_KEY } from '../../core/storage/storage.service';

export interface State {
  phrase: string;
  pageNumber: number;
  perPage: number;
}

export const initialState: State = {
  phrase: JSON.parse(localStorage.getItem(STORAGE_PHRASE_KEY)),
  pageNumber: 1,
  perPage: 20,
};
