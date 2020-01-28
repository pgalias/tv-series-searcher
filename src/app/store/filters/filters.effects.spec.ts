import { FiltersEffects } from './filters.effects';
import { ReplaySubject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { SetPageNumber, SetPhrase } from './filters.actions';
import { STORAGE_PAGE_NUMBER_KEY, STORAGE_PHRASE_KEY, StorageService } from '../../core/storage/storage.service';
import { FetchSeriesPending } from '../series/series.actions';
import { first, skip } from 'rxjs/operators';

describe('FiltersEffects', () => {
  let filtersEffects: FiltersEffects;
  let storageService: StorageService;
  let actions$: ReplaySubject<any>;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FiltersEffects,
      provideMockActions(() => actions$),
      {
        provide: StorageService,
        useValue: jasmine.createSpyObj('storageService', ['store']),
      }
    ]
  }));

  beforeEach(() => {
    filtersEffects = TestBed.get(FiltersEffects);
    storageService = TestBed.get(StorageService);
    actions$ = new ReplaySubject<any>(1);
  });

  describe('phraseChange$', () => {
    beforeEach(() => {
      actions$.next(new SetPhrase('foo'));
    });

    it('should dispatch FetchSeriesPending and SetPageNumber and also save phrase to localStorage', () => {
      filtersEffects.phraseChange$
        .pipe(first())
        .subscribe(action => {
          expect(action).toEqual(new SetPageNumber(1));
          expect(storageService.store).toHaveBeenCalledWith(STORAGE_PHRASE_KEY, 'foo');
      });

      filtersEffects.phraseChange$
        .pipe(skip(1))
        .subscribe(action => {
          expect(action).toEqual(new FetchSeriesPending('foo'));
          expect(storageService.store).toHaveBeenCalledWith(STORAGE_PHRASE_KEY, 'foo');
        });
    });
  });

  describe('pageNumberChange$', () => {
    beforeEach(() => {
      actions$.next(new SetPageNumber(3));
    });

    it('should save current page number to localStorage', () => {
      filtersEffects.pageNumberChange$.subscribe(action => {
        expect(storageService.store).toHaveBeenCalledWith(STORAGE_PAGE_NUMBER_KEY, 3);
      });
    });
  });
});
