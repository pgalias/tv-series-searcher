import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onPhraseChange(phrase: string): void {
    console.log('phrase', phrase);
  }
}