import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { iif, Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
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
import { STORAGE_FAVOURITES_KEY, StorageService } from '../../core/storage/storage.service';
import { removeFromCollection, saveUniqueToCollection } from '../../shared/helpers/store.helper';

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

  @Effect({ dispatch: false })
  addFavourite$: Observable<Action> = this.actions$.pipe(
    ofType<AddFavourite>(SeriesActionTypes.ADD_FAVOURITE),
    tap((action: AddFavourite) => {
      const collection = saveUniqueToCollection(
        this.storageService.receive(STORAGE_FAVOURITES_KEY) || [],
        action.payload
      );

      this.storageService.store(STORAGE_FAVOURITES_KEY, collection);
    })
  );

  @Effect({ dispatch: false })
  removeFavourite$: Observable<Action> = this.actions$.pipe(
    ofType<RemoveFavourite>(SeriesActionTypes.REMOVE_FAVOURITE),
    tap((action: RemoveFavourite) => {
      const collection = removeFromCollection(
        this.storageService.receive(STORAGE_FAVOURITES_KEY) || [],
        action.payload,
        'id',
      );

      this.storageService.store(STORAGE_FAVOURITES_KEY, collection);
    })
  );

  constructor(
    private actions$: Actions,
    private seriesService: SeriesService,
    private storageService: StorageService,
  ) {
  }

  private resolveServiceMethod({ payload }: FetchSeriesPending): Observable<Series[]> {
    if (Boolean(payload)) {
      return this.seriesService.getBy(payload);
    }

    return this.seriesService.getAll();
  }
}
