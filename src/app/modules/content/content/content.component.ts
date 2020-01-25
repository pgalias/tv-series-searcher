import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootStoreState, SeriesSelectors } from '../../../store';
import { FetchSeriesPending } from '../../../store/series/series.actions';
import { Series } from '../../../shared/models/series';
import { map, shareReplay } from 'rxjs/operators';
import { Flags } from '../../../shared/models/flags';

@Component({
  selector: 'main-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public series$: Observable<Series[]>;
  public flags$: Observable<Flags>;

  constructor(
    private store$: Store<RootStoreState.State>
  ) { }

  ngOnInit() {
    this.series$ = this.store$.select(SeriesSelectors.selectSeries);
    this.flags$ = this.store$.select(SeriesSelectors.selectSeriesFlags).pipe(shareReplay());
  }

  onPhraseChange(phrase: string): void {
    this.store$.dispatch(new FetchSeriesPending(phrase));
  }

  onFavouriteSeriesToggle(id: number): void {
    this.series$.pipe(
      map((series: Series[]) => series.find((serie: Series) => serie.id === id)),
    ).subscribe(console.log);
  }

}
