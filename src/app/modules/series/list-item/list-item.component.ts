import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faStar as sFaStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as rFaStar } from '@fortawesome/free-regular-svg-icons';
import { Series } from '../../../shared/models/series';

@Component({
  selector: 'series-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  private readonly contourStar = rFaStar;
  private readonly filledStar = sFaStar;

  @Input() readonly series: Series;
  @Output() toggleFavourite: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  get favourite() {
    return {
      icon: this.series.isFavourite ? this.filledStar : this.contourStar,
      title: this.series.isFavourite ? 'Remove from favourite' : 'Add to favourite',
    };
  }

}
