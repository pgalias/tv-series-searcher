import { Action } from '@ngrx/store';

export enum FiltersActionsTypes {
  SET_PHRASE = '[Filters] Set Phrase',
  CLEAR_PHRASE = '[Filters] Clear Phrase',
}

export class SetPhrase implements Action {
  readonly type = FiltersActionsTypes.SET_PHRASE;
  constructor(public payload: string) {}
}

export class ClearPhrase implements Action {
  readonly type = FiltersActionsTypes.CLEAR_PHRASE;
}

export type FiltersActions =
  | SetPhrase
  | ClearPhrase
;
