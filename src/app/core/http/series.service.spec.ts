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

  it('should return list of series from outside API', () => {
    const returnValue: Observable<object[]> = of([{
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

    httpClientSpy.get.and.returnValue(returnValue);
    seriesService.getSeries('Baz').subscribe((series: Series[]) => {
      expect(series).toEqual([
        Object.assign(new Series(), {
          id: 1,
          name: 'Foo',
          genres: [ 'Drama' ],
          cover: 'foo.jpg',
          rating: 12,
          summary: 'foobarbaz',
          external: 'abcde',
          isFavourite: false,
        }),
        Object.assign(new Series(), {
          id: 2,
          name: 'Bar',
          genres: [ 'Comedy' ],
          cover: 'bar.jpg',
          rating: 4,
          summary: 'foo bar baz',
          external: 'uwxyz',
          isFavourite: false,
        }),
      ]);
    });
  });
});
