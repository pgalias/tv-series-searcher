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
import { Series } from '../../shared/models/series';
import { createSeries } from '../../shared/helpers/tests.helper';

describe('SeriesEffects', () => {
  const mockSeries = [new Series()];

  let seriesEffects: SeriesEffects;
  let seriesService: SeriesService;
  let actions$: ReplaySubject<any>;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SeriesEffects,
      provideMockActions(() => actions$),
      {
        provide: SeriesService,
        useValue: jasmine.createSpyObj('seriesService', ['getAll', 'getBy'])
      },
    ],
  }));

  beforeEach(() => {
    seriesEffects = TestBed.get(SeriesEffects);
    seriesService = TestBed.get(SeriesService);
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
          expect(action).toEqual(new FetchSeriesSuccess(mockSeries));
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
          expect(action).toEqual(new FetchSeriesSuccess(mockSeries));
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
      const series = createSeries({ id: 123, isFavourite: false });
      actions$.next(new ToggleFavourite(series));

      seriesEffects.toggleFavourite$.subscribe(action => {
        expect(action).toEqual(new AddFavourite(series.id));
      });
    });

    it('should dispatch RemoveFavourite action when currently series is on favourites list', () => {
      const series = createSeries({ id: 123, isFavourite: true });
      actions$.next(new ToggleFavourite(series));

      seriesEffects.toggleFavourite$.subscribe(action => {
        expect(action).toEqual(new RemoveFavourite(series.id));
      });
    });
  });
});
