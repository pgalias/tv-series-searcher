import { TestScheduler } from 'rxjs/testing';
import { mapToModel } from './map-to-model.operator';

describe('mapToModel operator', () => {
  class Foo {
    public foo: string = null;
    public test = 'case';
  }

  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((((actual, expected) => {
      expect(actual).toEqual(expected);
    })));
  });

  it('should map object to given type', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('a |', { a: [{ foo: 'bar.baz' }] });
      const expected$ = '   z |';
      const result$ = source$.pipe(mapToModel(Foo));

      expectObservable(result$).toBe(
        expected$,
        { z: [Object.assign(new Foo(), { foo: 'bar.baz' })] }
      );
    });
  });
});
