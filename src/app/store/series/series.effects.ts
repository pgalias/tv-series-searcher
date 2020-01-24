import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import {
  FetchSeriesPending,
  FetchSeriesSuccess,
  FetchSeriesFailure,
  SeriesActionTypes,
} from './series.actions';
import { SeriesService } from '../../core/http/series.service';
import { Series } from '../../shared/models/series';
import { Action } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class SeriesEffects {

  constructor(
    private actions$: Actions,
    private seriesService: SeriesService
  ) { }

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
}
