import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { map as lodashMap } from 'lodash';
import { CoreModule } from '../core.module';
import { mapToModel } from '../../shared/operators/map-to-model.operator';
import { Series } from '../../shared/models/series';

@Injectable({
  providedIn: CoreModule
})
export class SeriesService {

  private readonly root = 'http://api.tvmaze.com';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Series[]> {
    return this.http.get(`${this.root}/shows`).pipe(mapToModel(Series));
  }

  getBy(phrase: string): Observable<Series[]> {
    return this.http.get(`${this.root}/search/shows?q=${phrase}`).pipe(
      map((series: { score: number, show: object }[]) => lodashMap(series, 'show')),
      mapToModel(Series)
    );
  }
}
