import { ModelMapper } from './model-mapper';

describe('Model Mapper', () => {
  const object = {
      a: 'bar',
      c: 'baz',
    };

  it('should map object to class with mapping properties when _propertyMap object is present', () => {
    class Baz {
      // tslint:disable-next-line:variable-name
      static _propertyMap = {
        b: 'c',
      };

      a: string = null;
      b: string = null;
    }

    expect(new ModelMapper(Baz).map(object)).toEqual(Object.assign(new Baz(), { a: 'bar', b: 'baz' }));
  });

  it('should map object to class without mapping properties when _propertyMap object is not present', () => {
    class Baz {
      a: string = null;
      b: string = null;
    }

    expect(new ModelMapper(Baz).map(object)).toEqual(Object.assign(new Baz(), { a: 'bar', b: null }));
  });
});
