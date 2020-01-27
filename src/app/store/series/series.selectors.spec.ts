import { selectFavorite } from './series.selectors';
import { Series } from '../../shared/models/series';

describe('SeriesSelectors', () => {
  describe('selectFavourite', () => {
    it('should return collection of series which are favourite', () => {
      const series: Partial<Series>[] = [
        Object.assign(new Series(), { id: 123, isFavourite: false }),
        Object.assign(new Series(), { id: 234, isFavourite: false }),
        Object.assign(new Series(), { id: 345, isFavourite: true }),
        Object.assign(new Series(), { id: 456, isFavourite: false }),
      ];
      expect(selectFavorite.projector({ series })).toEqual([
        Object.assign(new Series(), { id: 345, isFavourite: true }),
      ]);
    });

    it('should return empty collection when there are not any favourite Series', () => {
      const series: Partial<Series>[] = [
        Object.assign(new Series(), { id: 123, isFavourite: false }),
        Object.assign(new Series(), { id: 234, isFavourite: false }),
        Object.assign(new Series(), { id: 456, isFavourite: false }),
      ];

      expect(selectFavorite.projector({ series })).toEqual([]);
    });
  });
});
