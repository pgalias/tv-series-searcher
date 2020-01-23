import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelMapper } from '../models/model-mapper';

export function mapToModel<T, R>(type: new() => R): OperatorFunction<T[], R[]> {
  return (input$: Observable<T[]>): Observable<R[]> => input$.pipe(
    map((data: T[]) => data.map((item: T) => new ModelMapper(type).map(item)))
  );
}
