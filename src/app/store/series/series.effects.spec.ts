import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, ReplaySubject, throwError } from 'rxjs';

import { SeriesEffects } from './series.effects';
import {
  AddFavourite,
  FetchSeriesFailure,
  FetchSeriesPending,
  FetchSeriesSuccess,
  RemoveFavourite,
  ToggleFavourite
} from './series.actions';
import { SeriesService } from '../../core/http/series.service';
import { STORAGE_FAVOURITES_KEY, StorageService } from '../../core/storage/storage.service';
import { Series } from '../../shared/models/series';
import { createSeries } from '../../shared/helpers/tests.helper';

describe('SeriesEffects', () => {
  const mockSeries = [new Series()];

  let seriesEffects: SeriesEffects;
  let seriesService: SeriesService;
  let storageService: StorageService;
  let actions$: ReplaySubject<any>;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SeriesEffects,
      provideMockActions(() => actions$),
      {
        provide: SeriesService,
        useValue: jasmine.createSpyObj('seriesService', ['getAll', 'getBy'])
      },
      {
        provide: StorageService,
        useValue: jasmine.createSpyObj('storageService', ['receive', 'store']),
      }
    ],
  }));

  beforeEach(() => {
    seriesEffects = TestBed.get(SeriesEffects);
    seriesService = TestBed.get(SeriesService);
    storageService = TestBed.get(StorageService);
    actions$ = new ReplaySubject<any>(1);
  });

  describe('fetchSeries$', () => {
    describe('with phrase', () => {
      beforeEach(() => {
        actions$.next(new FetchSeriesPending('foo'));
      });

      it('should dispatch FetchSeriesSuccess action on success', () => {
        (seriesService.getBy as jasmine.Spy).and.returnValue(of(mockSeries));
        seriesEffects.fetchSeries$.subscribe(action => {
          expect(action).toEqual(new FetchSeriesSuccess([mockSeries]));
          expect(seriesService.getAll).not.toHaveBeenCalled();
        });
      });

      it('should dispatch FetchSeriesFailure action on failure', () => {
        (seriesService.getBy as jasmine.Spy).and.returnValue(throwError({status: 500}));
        seriesEffects.fetchSeries$.subscribe(action => {
          expect(action).toEqual(new FetchSeriesFailure());
          expect(seriesService.getAll).not.toHaveBeenCalled();
        });
      });
    });

    describe('without phrase', () => {
      beforeEach(() => {
        actions$.next(new FetchSeriesPending(''));
      });

      it('should dispatch FetchSeriesSuccess action on success', () => {
        (seriesService.getAll as jasmine.Spy).and.returnValue(of(mockSeries));
        seriesEffects.fetchSeries$.subscribe(action => {
          expect(action).toEqual(new FetchSeriesSuccess([mockSeries]));
          expect(seriesService.getBy).not.toHaveBeenCalled();
        });
      });

      it('should dispatch FetchSeriesFailure action on failure', () => {
        (seriesService.getAll as jasmine.Spy).and.returnValue(throwError({status: 500}));
        seriesEffects.fetchSeries$.subscribe(action => {
          expect(action).toEqual(new FetchSeriesFailure());
          expect(seriesService.getBy).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('toggleFavourite$', () => {
    it('should dispatch AddFavourite action when currently series is not on favourites list', () => {
      const series = createSeries({ id: 123 });
      actions$.next(new ToggleFavourite(series));

      seriesEffects.toggleFavourite$.subscribe(action => {
        expect(action).toEqual(new AddFavourite(series));
      });
    });

    it('should dispatch RemoveFavourite action when currently series is on favourites list', () => {
      const series = createSeries({ id: 123, isFavourite: true });
      actions$.next(new ToggleFavourite(series));

      seriesEffects.toggleFavourite$.subscribe(action => {
        expect(action).toEqual(new RemoveFavourite(series));
      });
    });
  });

  describe('addFavourite$', () => {
    it('should store collection with new value in localStorage', () => {
      const series = createSeries({ id: 123 });
      actions$.next(new AddFavourite(series));

      seriesEffects.addFavourite$.subscribe(action => {
        expect(storageService.store).toHaveBeenCalledWith(STORAGE_FAVOURITES_KEY, [createSeries({ id: 123 })]);
      });
    });
  });

  describe('removeFavourite$', () => {
    it('should store collection without removed value in localStorage', () => {
      const series = createSeries({ id: 234 });
      actions$.next(new RemoveFavourite(series));

      const currentStorage = [
        createSeries({ id: 123 }),
        createSeries({ id: 234 }),
      ];
      (storageService.receive as jasmine.Spy).and.returnValue(currentStorage);

      seriesEffects.removeFavourite$.subscribe(() => {
        expect(storageService.store).toHaveBeenCalledWith(STORAGE_FAVOURITES_KEY, [ createSeries({ id: 123 }) ]);
      });
    });
  });
});
