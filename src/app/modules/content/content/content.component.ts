import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { FiltersSelectors, RootStoreSelectors, RootStoreState, SeriesSelectors } from '../../../store';
import { FetchSeriesPending, ToggleFavourite } from '../../../store/series/series.actions';
import { Series } from '../../../shared/models/series';
import { Flags } from '../../../shared/models/flags';
import { SetPageNumber, SetPhrase } from '../../../store/filters/filters.actions';

@Component({
  selector: 'main-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public series$: Observable<Series[]>;
  public flags$: Observable<Flags>;
  public pagesCount$: Observable<number>;
  public currentPage$: Observable<number>;

  constructor(
    private store$: Store<RootStoreState.State>
  ) { }

  ngOnInit() {
    this.store$.select(FiltersSelectors.selectPhrase).subscribe(phrase => this.store$.dispatch(new FetchSeriesPending(phrase)));
    this.series$ = this.store$.select(RootStoreSelectors.selectSeriesByPage);
    this.flags$ = this.store$.select(SeriesSelectors.selectSeriesFlags).pipe(shareReplay());
    this.pagesCount$ = this.store$.select(RootStoreSelectors.selectMaxPages);
    this.currentPage$ = this.store$.select(FiltersSelectors.selectCurrentPage);
  }

  onPhraseChange(phrase: string): void {
    this.store$.dispatch(new SetPhrase(phrase));
  }

  onPageChange(page: number): void {
    this.store$.dispatch(new SetPageNumber(page));
  }

  onFavouriteSeriesToggle(series: Series): void {
    this.store$.dispatch(new ToggleFavourite(series));
  }

}
