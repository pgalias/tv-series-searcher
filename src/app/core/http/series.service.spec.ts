import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SeriesService } from './series.service';
import { Series } from '../../shared/models/series';

describe('SeriesService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let seriesService: SeriesService;
  const endpointReturnValue: Observable<object[]> = of([{
    show: {
      id: 1,
      name: 'Foo',
      genres: [ 'Drama' ],
      image: {
        medium: 'foo.jpg',
      },
      rating: {
        average: 12,
      },
      summary: 'foobarbaz',
      externals: {
        imdb: 'abcde',
      },
    }
  }, {
    show: {
      id: 2,
      name: 'Bar',
      genres: [ 'Comedy' ],
      image: {
        medium: 'bar.jpg',
      },
      rating: {
        average: 4,
      },
      summary: 'foo bar baz',
      externals: {
        imdb: 'uwxyz',
      },
    }
  }]);

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(endpointReturnValue);
    seriesService = new SeriesService(httpClientSpy as any);
  });

  describe('getSeriesBy method', () => {
    it('should return list of series from outside API', () => {
      seriesService.getSeriesBy('Baz').subscribe((series: Series[]) => {
        expect(series).toEqual([
          Object.assign(new Series(), {
            id: 1,
            name: 'Foo',
            genres: [ 'Drama' ],
            cover: 'foo.jpg',
            rating: 12,
            summary: 'foobarbaz',
            external: 'abcde',
            isFavourite: null,
          }),
          Object.assign(new Series(), {
            id: 2,
            name: 'Bar',
            genres: [ 'Comedy' ],
            cover: 'bar.jpg',
            rating: 4,
            summary: 'foo bar baz',
            external: 'uwxyz',
            isFavourite: null,
          }),
        ]);
      });
    });
  });

  describe('getAllSeries method', () => {
    it('should return list of series from oustide API', () => {
      seriesService.getAllSeries().subscribe((series: Series[]) => {
        expect(series).toEqual([
          Object.assign(new Series(), {
            id: 1,
            name: 'Foo',
            genres: [ 'Drama' ],
            cover: 'foo.jpg',
            rating: 12,
            summary: 'foobarbaz',
            external: 'abcde',
            isFavourite: null,
          }),
          Object.assign(new Series(), {
            id: 2,
            name: 'Bar',
            genres: [ 'Comedy' ],
            cover: 'bar.jpg',
            rating: 4,
            summary: 'foo bar baz',
            external: 'uwxyz',
            isFavourite: null,
          }),
        ]);
      });
    });
  });
});
