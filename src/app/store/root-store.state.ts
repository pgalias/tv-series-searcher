import { SeriesState } from './series';
import { FiltersState } from './filters';

export interface State {
  series: SeriesState.State;
  filters: FiltersState.State;
}
