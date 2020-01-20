import { TestScheduler } from 'rxjs/testing';
import debounceUnique from './debounce-unique.operator';

describe('debounceUnique operator', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler(((actual, expected) => {
      expect(actual).toEqual(expected);
    }));
  });

  it('should get only last value within debounced time', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('1ms a 1ms b 2s |', { a: 'foo', b: 'bar' });
      const expected$ = '   1ms - 1ms 300ms z 1700ms |';
      const result$ = source$.pipe(debounceUnique(300));

      expectObservable(result$).toBe(expected$, { z: 'bar' });
    });
  });

  it('should reject repeated value', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('1ms a 1s b 2s |', { a: 'foo', b: 'foo' });
      const expected$ = '   1ms 300ms z 2701ms |';
      const result$ = source$.pipe(debounceUnique(300));

      expectObservable(result$).toBe(expected$, { z: 'foo' });
    });
  });
});
