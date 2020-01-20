import { MonoTypeOperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { isEqual } from 'lodash';

export default function debounceUnique<T>(time: number): MonoTypeOperatorFunction<T> {
  return input$ => input$.pipe(
    debounceTime(time),
    distinctUntilChanged(isEqual)
  );
}
