import using from 'jasmine-data-provider';
import { isBetween, isNumericType } from './number.helper';

describe('Number Helper', () => {
  it('resolves if given number is between range', () => {
    using([
      { predicate: isBetween(1, 3)(2), result: true },
      { predicate: isBetween(-3, -1)(-2), result: true },
      { predicate: isBetween(-50, 50)(-20), result: true },
      { predicate: isBetween(0.1, 0.2)(0.1), result: true },
      { predicate: isBetween(0.1, 0.2)(0.2), result: true },
      { predicate: isBetween(1, 3)(40), result: false },
      { predicate: isBetween(-100, -50)(-40), result: false },
      { predicate: isBetween(0.101, 0.102)(0.1), result: false },
      { predicate: isBetween(0.101, 0.102)(0.103), result: false },
    ], ({ predicate, result }) => {
      expect(predicate).toBe(result);
    });
  });

  it('checks if given string or number is numeric type', () => {
    using([
      { predicate: isNumericType(1), result: true },
      { predicate: isNumericType('1'), result: true },
      { predicate: isNumericType('d'), result: false },
      { predicate: isNumericType(NaN), result: false },
      { predicate: isNumericType(Infinity), result: false },
    ], ({ predicate, result }) => {
      expect(predicate).toBe(result);
    });
  });
});
