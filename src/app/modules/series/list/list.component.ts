import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Series } from '../../../shared/models/series';

@Component({
  selector: 'series-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() series: Series[];
  @Input() loading: boolean;
  @Input() loaded: boolean;
  @Input() error: boolean;
  @Output() toggleFavourite: EventEmitter<Series> = new EventEmitter<Series>();
}
