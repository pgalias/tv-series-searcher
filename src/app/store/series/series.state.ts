import { Series } from '../../shared/models/series';
import { Flags } from '../../shared/models/flags';
import { STORAGE_FAVOURITES_KEY } from '../../core/storage/storage.service';

export interface State {
  series: Series[][];
  favourites: Series[];
  flags: Flags;
}

export const initialState: State = {
  series: [],
  favourites: JSON.parse(localStorage.getItem(STORAGE_FAVOURITES_KEY)) || [],
  flags: new Flags(),
};
