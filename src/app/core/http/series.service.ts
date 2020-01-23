import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoreModule } from '../core.module';
import { mapToModel } from '../../shared/operators/map-to-model.operator';
import { Series } from '../../shared/models/series';

@Injectable({
  providedIn: CoreModule
})
export class SeriesService {

  private readonly root = 'http://api.tvmaze.com/search';

  constructor(private http: HttpClient) {
  }

  getSeries(phrase: string): Observable<Series[]> {
    return this.http.get(`${this.root}/shows?q=${phrase}`).pipe(mapToModel(Series));
  }
}
