import { selectSeriesByPage } from './root-store.selectors';
import { createSeries } from '../shared/helpers/tests.helper';

describe('RootStoreSelectors', () => {
  describe('selectSeriesByPage', () => {
    let series;
    let favourites;

    beforeEach(() => {
      series = [
        [ createSeries({ id: 123 }), createSeries({ id: 234 }) ],
        [ createSeries({ id: 345 }), createSeries({ id: 456 }) ],
        [ createSeries({ id: 567 }) ],
      ];
      favourites = [
        createSeries( { id: 345 } )
      ];
    });

    it('should return series for current page', () => {
      expect(selectSeriesByPage.projector( series, [], 2 )).toEqual([
        createSeries({ id: 345 }), createSeries({ id: 456 })
      ]);
    });

    it('should map series list with favourites list', () => {
      expect(selectSeriesByPage.projector( series, favourites, 2 )).toEqual([
        createSeries( {id: 345, isFavourite: true }), createSeries({ id: 456 }),
      ]);
    });
  });
});
