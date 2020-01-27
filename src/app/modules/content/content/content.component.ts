import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { FiltersSelectors, RootStoreState, SeriesSelectors } from '../../../store';
import { FetchSeriesPending, ToggleFavourite } from '../../../store/series/series.actions';
import { Series } from '../../../shared/models/series';
import { Flags } from '../../../shared/models/flags';
import { SetPhrase } from '../../../store/filters/filters.actions';

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
    this.store$.select(FiltersSelectors.selectPhrase).subscribe(phrase => this.store$.dispatch(new FetchSeriesPending(phrase)));
    this.series$ = this.store$.select(SeriesSelectors.selectSeries);
    this.flags$ = this.store$.select(SeriesSelectors.selectSeriesFlags).pipe(shareReplay());
  }

  onPhraseChange(phrase: string): void {
    this.store$.dispatch(new SetPhrase(phrase));
  }

  onFavouriteSeriesToggle(series: Series): void {
    this.store$.dispatch(new ToggleFavourite(series));
  }

}
