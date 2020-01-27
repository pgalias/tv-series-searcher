import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SeriesService } from './series.service';
import { Series } from '../../shared/models/series';

describe('SeriesService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let seriesService: SeriesService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    seriesService = new SeriesService(httpClientSpy as any);
  });

  describe('getSeriesBy method', () => {
    const endpointReturnValue: Observable<object[]> = of([{
      show: {
        id: 1,
        name: 'Foo',
        genres: ['Drama'],
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
        genres: ['Comedy'],
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

    it('should return list of series from outside API', () => {
      httpClientSpy.get.and.returnValue(endpointReturnValue);

      seriesService.getBy('Baz').subscribe((series: Series[]) => {
        expect(series).toEqual([
          Object.assign(new Series(), {
            id: 1,
            name: 'Foo',
            genres: ['Drama'],
            cover: 'foo.jpg',
            rating: 12,
            summary: 'foobarbaz',
            external: 'abcde',
            isFavourite: null,
          }),
          Object.assign(new Series(), {
            id: 2,
            name: 'Bar',
            genres: ['Comedy'],
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
    const endpointReturnValue: Observable<object[]> = of([{
      id: 1,
      name: 'Foo',
      genres: ['Drama'],
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
    }, {
      id: 2,
      name: 'Bar',
      genres: ['Comedy'],
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
    }]);

    it('should return list of series from oustide API', () => {
      httpClientSpy.get.and.returnValue(endpointReturnValue);

      seriesService.getAll().subscribe((series: Series[]) => {
        expect(series).toEqual([
          Object.assign(new Series(), {
            id: 1,
            name: 'Foo',
            genres: ['Drama'],
            cover: 'foo.jpg',
            rating: 12,
            summary: 'foobarbaz',
            external: 'abcde',
            isFavourite: null,
          }),
          Object.assign(new Series(), {
            id: 2,
            name: 'Bar',
            genres: ['Comedy'],
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
