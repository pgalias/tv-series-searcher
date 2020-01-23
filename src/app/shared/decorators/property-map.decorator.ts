export function PropertyMap(sourceProperty: string) {
  return (target: any, propName: string) => {
    if (!target.constructor._propertyMap) {
      target.constructor._propertyMap = {};
    }

    target.constructor._propertyMap[propName] = sourceProperty;
  };
}
