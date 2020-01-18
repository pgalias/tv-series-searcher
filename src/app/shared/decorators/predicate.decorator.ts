export default function Predicate(fn: (v: any) => boolean) {
  return (target: any, propName: string) => {
    let v: number;

    Object.defineProperty(target, propName, {
      get() {
        return v;
      },
      set(newValue: any): void {
        v = newValue;

        if (!fn(newValue)) {
          throw new Error(`${target.constructor.name}: @Input '${propName}' is invalid`);
        }
      },
      configurable: true,
      enumerable: true,
    });
  };
}
