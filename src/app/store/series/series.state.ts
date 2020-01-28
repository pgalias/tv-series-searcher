import { Series } from '../../shared/models/series';
import { Flags } from '../../shared/models/flags';
import { Id } from '../../shared/models/id';

export const setSeriesFavourite = (series: Series[][], seriesToUpdate: Id, favouriteValue: boolean) => {

};

export interface State {
  series: Series[][];
  favourites: Series[];
  flags: Flags;
}

export const initialState: State = {
  series: [],
  favourites: [],
  flags: new Flags(),
};
