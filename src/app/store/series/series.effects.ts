import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { iif, Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { chunk } from 'lodash';
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
      this.resolveServiceMethod(action).pipe(
        map((series: Series[]) => new FetchSeriesSuccess(chunk(series, 20))),
        catchError(() => of(new FetchSeriesFailure())),
      )
    )
  );

  @Effect()
  toggleFavourite$: Observable<Action> = this.actions$.pipe(
    ofType<ToggleFavourite>(SeriesActionTypes.TOGGLE_FAVOURITE),
    concatMap((action: ToggleFavourite) => iif(
      () => action.payload.isFavourite,
      of(new RemoveFavourite(action.payload)),
      of(new AddFavourite(action.payload)),
    ))
  );

  constructor(
    private actions$: Actions,
    private seriesService: SeriesService,
  ) {
  }

  private resolveServiceMethod({ payload }: FetchSeriesPending): Observable<Series[]> {
    if (Boolean(payload)) {
      return this.seriesService.getBy(payload);
    }

    return this.seriesService.getAll();
  }
}
