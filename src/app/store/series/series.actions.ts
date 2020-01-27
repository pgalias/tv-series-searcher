import { Action } from '@ngrx/store';
import { Series } from '../../shared/models/series';
import { Id } from '../../shared/models/id';

export enum SeriesActionTypes {
  FETCH_SERIES_PENDING = '[Series] Fetch Pending',
  FETCH_SERIES_SUCCESS = '[Series] Fetch Success',
  FETCH_SERIES_FAILURE = '[Series] Fetch Failure',

  ADD_FAVOURITE = '[Favorite] Add',
  REMOVE_FAVOURITE = '[Favourite] Remove',
  TOGGLE_FAVOURITE = '[Favourite] Toggle',
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

export class AddFavourite implements Action {
  readonly type = SeriesActionTypes.ADD_FAVOURITE;
  constructor(public payload: Id) {}
}

export class RemoveFavourite implements Action {
  readonly type = SeriesActionTypes.REMOVE_FAVOURITE;
  constructor(public payload: Id) {}
}

export class ToggleFavourite implements Action {
  readonly type = SeriesActionTypes.TOGGLE_FAVOURITE;
  constructor(public payload: Series) {}
}

export type SeriesActions =
  | FetchSeriesPending
  | FetchSeriesSuccess
  | FetchSeriesFailure
  | AddFavourite
  | RemoveFavourite
  | ToggleFavourite
;
