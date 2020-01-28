import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { FiltersActionsTypes, SetPageNumber, SetPhrase } from './filters.actions';
import { FetchSeriesPending } from '../series/series.actions';
import { STORAGE_PAGE_NUMBER_KEY, STORAGE_PHRASE_KEY, StorageService } from '../../core/storage/storage.service';

@Injectable()
export class FiltersEffects {

  @Effect()
  phraseChange$: Observable<Action> = this.actions$.pipe(
    ofType<SetPhrase>(FiltersActionsTypes.SET_PHRASE),
    tap(action => this.storageService.store(STORAGE_PHRASE_KEY, action.payload)),
    concatMap(action => [
      new SetPageNumber(1),
      new FetchSeriesPending(action.payload),
    ]),
  );

  @Effect({ dispatch: false })
  pageNumberChange$: Observable<Action> = this.actions$.pipe(
    ofType<SetPageNumber>(FiltersActionsTypes.SET_PAGE_NUMBER),
    tap((action: SetPageNumber) => this.storageService.store(STORAGE_PAGE_NUMBER_KEY, action.payload)),
  );

  constructor(
    private actions$: Actions,
    private storageService: StorageService,
  ) {
  }
}
