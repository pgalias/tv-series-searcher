import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Series } from '../../../shared/models/series';

@Component({
  selector: 'series-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() series: Series[];
  @Input() loading: boolean;
  @Input() loaded: boolean;
  @Input() error: boolean;
  @Output() toggleFavourite: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
