import { FiltersEffects } from './filters.effects';
import { ReplaySubject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { SetPhrase } from './filters.actions';
import { StorageService } from '../../core/storage/storage.service';
import { FetchSeriesPending } from '../series/series.actions';

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

    it('should dispatch FetchSeriesPending and save phrase to localStorage', () => {
      filtersEffects.phraseChange$.subscribe(action => {
        expect(action).toEqual(new FetchSeriesPending('foo'));
        expect(storageService.store).toHaveBeenCalled();
      });
    });
  });
});
