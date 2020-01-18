import using from 'jasmine-data-provider';
import { isBetween } from './number.helper';

describe('Number Helper', () => {
  using([
    { predicate: isBetween(2, 1, 3), result: true },
    { predicate: isBetween(-2, -3, -1), result: true },
    { predicate: isBetween(-20, -50, 50), result: true },
    { predicate: isBetween(0.1, 0.1, 0.2), result: true },
    { predicate: isBetween(0.2, 0.1, 0.2), result: true },
    { predicate: isBetween(40, 1, 3), result: false },
    { predicate: isBetween(-40, -100, -50), result: false },
    { predicate: isBetween(0.1, 0.101, 0.102), result: false },
    { predicate: isBetween(0.103, 0.101, 0.102), result: false },
  ], ({ predicate, result }) => {
    it('resolves if given number is between range', () => {
      expect(predicate).toBe(result);
    });
  });
});
