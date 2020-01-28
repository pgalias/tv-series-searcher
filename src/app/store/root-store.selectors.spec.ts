import { selectSeriesByPage } from './root-store.selectors';
import { createSeries } from '../shared/helpers/tests.helper';

describe('RootStoreSelectors', () => {
  describe('selectSeriesByPage', () => {
    it('should return series for current page', () => {
      const series = [
        [ createSeries({ id: 123 }), createSeries({ id: 234 }) ],
        [ createSeries({ id: 345 }), createSeries({ id: 456 }) ],
        [ createSeries({ id: 567 }) ],
      ];

      expect(selectSeriesByPage.projector( series, 2 )).toEqual([
        createSeries({ id: 345 }), createSeries({ id: 456 })
      ]);
    });
  });
});
