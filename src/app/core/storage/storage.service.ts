import { Injectable } from '@angular/core';
import { isObject } from 'lodash';
import { CoreModule } from '../core.module';

export const STORAGE_PHRASE_KEY = 'phrase';
export const STORAGE_PAGE_NUMBER_KEY = 'page_number';
export const STORAGE_FAVOURITES_KEY = 'favourites';

@Injectable({
  providedIn: CoreModule
})
export class StorageService {

  public receive(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  public store(key: string, value): void {
    value = isObject(value) ? JSON.stringify(value) : value;
    localStorage.setItem(key, value);
  }
}
