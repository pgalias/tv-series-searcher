import { filter, isEqual, uniqWith } from 'lodash';

export function saveUniqueToCollection<T>(collection: T[], item: T): T[] {
  return uniqWith([
    ...collection,
    item
  ], isEqual);
}

export function removeFromCollection<T>(collection: T[], item: T, predicate?: string): T[] {
  if (predicate) {
    return filter(collection, o => o[predicate] !== item[predicate]);
  }

  return filter(collection, o => o !== item);
}
