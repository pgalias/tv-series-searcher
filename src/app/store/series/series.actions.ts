import { Action } from '@ngrx/store';
import { Series } from '../../shared/models/series';

export enum SeriesActionTypes {
  FETCH_SERIES_PENDING = '[Series] Fetch Pending',
  FETCH_SERIES_SUCCESS = '[Series] Fetch Success',
  FETCH_SERIES_FAILURE = '[Series] Fetch Failure',
}

export class FetchSeriesPending implements Action {
  readonly type = SeriesActionTypes.FETCH_SERIES_PENDING;
  constructor(public payload: string) {}
}

export class FetchSeriesSuccess implements Action {
  readonly type = SeriesActionTypes.FETCH_SERIES_SUCCESS;
  constructor(public payload: Series[]) {}
}

export class FetchSeriesFailure implements Action {
  readonly type = SeriesActionTypes.FETCH_SERIES_FAILURE;
}

export type SeriesActions = FetchSeriesPending | FetchSeriesSuccess | FetchSeriesFailure;
