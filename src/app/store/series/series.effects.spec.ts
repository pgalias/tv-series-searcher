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
        useValue: jasmine.createSpyObj('seriesService', ['getAllSeries', 'getSeriesBy'])
      },
    ],
  }));

  beforeEach(() => {
    seriesEffects = TestBed.get(SeriesEffects);
    seriesService = TestBed.get(SeriesService);
    actions$ = new ReplaySubject<any>(1);
  });

  describe('fetchSeries$', () => {
    beforeEach(() => {
      actions$.next(new FetchSeriesPending('foo'));
    });

    it('should dispatch FetchSeriesSuccess action on success', () => {
      (seriesService.getSeriesBy as jasmine.Spy).and.returnValue(of(mockSeries));
      seriesEffects.fetchSeries$.subscribe(action => {
        expect(action).toEqual(new FetchSeriesSuccess(mockSeries));
      });
    });

    it('should dispatch FetchSeriesFailure action on failure', () => {
      (seriesService.getSeriesBy as jasmine.Spy).and.returnValue(throwError({status: 500}));
      seriesEffects.fetchSeries$.subscribe(action => {
        expect(action).toEqual(new FetchSeriesFailure());
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
