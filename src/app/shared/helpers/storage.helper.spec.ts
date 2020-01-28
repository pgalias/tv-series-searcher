import { removeFromCollection, saveUniqueToCollection } from './store.helper';

describe('storage helper', () => {
  let collection;

  beforeEach(() => {
    collection = [1, 2, 6, 8, 9, 43, 12];
  });

  describe('saveUniqueToCollection', () => {


    it('should store new item in collection', () => {
      const expected = [
        ...collection,
        16,
      ];

      expect(saveUniqueToCollection(collection, 16)).toEqual(expected);
    });

    it('should not store new item in collection when it already exists in it', () => {
      const expected = [ ...collection ];

      expect(saveUniqueToCollection(collection, 12)).toEqual(expected);
    });
  });

  describe('removeFromCollection', () => {
    it('should find item in collection and removes it', () => {
      const [, ...expected] = collection;

      expect(removeFromCollection(collection, 1)).toEqual(expected);
    });
  });
});
