import {PropertyMap} from './property-map.decorator';

describe('PropertyMap', () => {
  it('should create _propertyMap object to object prototype', () => {
    class Bar {
      a: string = null;
      @PropertyMap('c')
      b: string = null;
    }

    expect((Bar as any)._propertyMap).toBeDefined();
    expect((Bar as any)._propertyMap).toEqual({
      b: 'c'
    });
  });
});
