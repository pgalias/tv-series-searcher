import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { iif, Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import {
  AddFavourite,
  FetchSeriesFailure,
  FetchSeriesPending,
  FetchSeriesSuccess,
  RemoveFavourite,
  SeriesActionTypes,
  ToggleFavourite,
} from './series.actions';
import { SeriesService } from '../../core/http/series.service';
import { Series } from '../../shared/models/series';

@Injectable()
export class SeriesEffects {

  @Effect()
  fetchSeries$: Observable<Action> = this.actions$.pipe(
    ofType<FetchSeriesPending>(SeriesActionTypes.FETCH_SERIES_PENDING),
    switchMap(action =>
      this.seriesService.getSeries(action.payload).pipe(
        map((series: Series[]) => new FetchSeriesSuccess(series)),
        catchError(() => of(new FetchSeriesFailure())),
      )
    )
  );

  @Effect()
  toggleFavourite$: Observable<Action> = this.actions$.pipe(
    ofType<ToggleFavourite>(SeriesActionTypes.TOGGLE_FAVOURITE),
    concatMap((action: ToggleFavourite) => iif(
      () => action.payload.isFavourite,
      of(new RemoveFavourite(action.payload.id)),
      of(new AddFavourite(action.payload.id)),
    ))
  );

  constructor(
    private actions$: Actions,
    private seriesService: SeriesService,
  ) {
  }
}
