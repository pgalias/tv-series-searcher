export function Predicate(fn: (v: any) => boolean) {
  return (target: any, propName: string) => {
    Object.defineProperty(this, '_propName', {});

    Object.defineProperty(target, propName, {
      get() {
        return this['_propName'];
      },
      set(v: any): void {
        this['_propName'] = v;

        if (!fn(v)) {
          throw new Error(`${target.constructor.name}: @Input '${propName}' value is invalid.`);
        }
      },
      configurable: true,
      enumerable: true,
    });
  };
}
