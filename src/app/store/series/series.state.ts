import { Series } from '../../shared/models/series';

export interface State {
  series: Series[];
  loading: boolean;
  error: boolean;
}

export const initialState: State = {
  series: [],
  loading: false,
  error: false,
};
