import { Action } from '@ngrx/store';

export enum FiltersActionsTypes {
  SET_PHRASE = '[Filters] Set Phrase',
  CLEAR_PHRASE = '[Filters] Clear Phrase',

  SET_PAGE_NUMBER = '[Filters] Set Page Number',
}

export class SetPhrase implements Action {
  readonly type = FiltersActionsTypes.SET_PHRASE;
  constructor(public payload: string) {}
}

export class ClearPhrase implements Action {
  readonly type = FiltersActionsTypes.CLEAR_PHRASE;
}

export class SetPageNumber implements Action{
  readonly type = FiltersActionsTypes.SET_PAGE_NUMBER;
  constructor(public payload: number) {}
}

export type FiltersActions =
  | SetPhrase
  | ClearPhrase
  | SetPageNumber
;
