import { get } from 'lodash';

export class ModelMapper<T> {
  private readonly target: any;
  private readonly propertyMapping: object;

  constructor(target: new() => T) {
    this.target = new target();
    this.propertyMapping = this.target.constructor._propertyMap;
  }

  map(source): T {
    Object.keys(this.target).forEach((key) => {
      const mappedKey = get(this.propertyMapping, key);
      this.target[key] = get(source, mappedKey, source[key]) || this.target[key];
    });

    return this.target;
  }
}
