import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Series } from '../../../shared/models/series';

@Component({
  selector: 'series-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  @Input() readonly series: Series;
  @Output() toggleFavourite: EventEmitter<Series> = new EventEmitter<Series>();

  private readonly summaryMaxLength = 100;

  get externalLink(): string {
    return `https://www.imdb.com/title/${this.series.external}`;
  }

}
