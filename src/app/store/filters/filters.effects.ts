import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class FiltersEffects {

  @Effect()
  foo$ = null;

  constructor(
    private actions$: Actions,
  ) {}
}
