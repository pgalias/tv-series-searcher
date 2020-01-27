import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { FiltersActionsTypes, SetPhrase } from './filters.actions';
import { FetchSeriesPending } from '../series/series.actions';
import { STORAGE_PHRASE_KEY, StorageService } from '../../core/storage/storage.service';

@Injectable()
export class FiltersEffects {

  @Effect()
  phraseChange$: Observable<Action> = this.actions$.pipe(
    ofType<SetPhrase>(FiltersActionsTypes.SET_PHRASE),
    tap(action => this.storageService.store(STORAGE_PHRASE_KEY, JSON.stringify(action.payload))),
    concatMap(action => of(new FetchSeriesPending(action.payload))),
  );

  constructor(
    private actions$: Actions,
    private storageService: StorageService,
  ) {
  }
}
