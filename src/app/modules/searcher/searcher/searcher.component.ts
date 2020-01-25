import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent {
  @Output() onPhraseChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
}
