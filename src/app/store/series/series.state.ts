import { Series } from '../../shared/models/series';
import { Flags } from '../../shared/models/flags';

export interface State {
  series: Series[];
  flags: Flags;
}

export const initialState: State = {
  series: [],
  flags: new Flags(),
};
