import { Series } from '../../shared/models/series';
import { Flags } from '../../shared/models/flags';
import { Id } from '../../shared/models/id';

export const setSeriesFavourite = (series: Series[], seriesToUpdate: Id, favouriteValue: boolean) => series.map((serie: Series) => {
  if (serie.id === seriesToUpdate) {
    return Object.assign(new Series(), serie, { isFavourite: favouriteValue });
  }

  return serie;
});

export interface State {
  series: Series[];
  flags: Flags;
}

export const initialState: State = {
  series: [],
  flags: new Flags(),
};
