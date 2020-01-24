import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, ReplaySubject, throwError } from 'rxjs';

import { SeriesEffects } from './series.effects';
import { FetchSeriesFailure, FetchSeriesPending, FetchSeriesSuccess } from './series.actions';
import { SeriesService } from '../../core/http/series.service';
import { Series } from '../../shared/models/series';

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
        useValue: jasmine.createSpyObj('seriesService', ['getSeries'])
      },
    ],
  }));

  beforeEach(() => {
    seriesEffects = TestBed.get(SeriesEffects);
    seriesService = TestBed.get(SeriesService);
    actions$ = new ReplaySubject<any>(1);
    actions$.next(new FetchSeriesPending('foo'));
  });

  it('should dispatch FetchSeriesSuccess action on success', () => {
    (seriesService.getSeries as jasmine.Spy).and.returnValue(of(mockSeries));
    seriesEffects.fetchSeries$.subscribe(action => {
      expect(action).toEqual(new FetchSeriesSuccess(mockSeries));
    });
  });

  it('should dispatch FetchSeriesFailure action on failure', () => {
    (seriesService.getSeries as jasmine.Spy).and.returnValue(throwError({status: 500}));
    seriesEffects.fetchSeries$.subscribe(action => {
      expect(action).toEqual(new FetchSeriesFailure());
    });
  });
});
