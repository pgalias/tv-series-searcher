import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { STORAGE_PHRASE_KEY, StorageService } from '../../../core/storage/storage.service';
import debounceUnique from '../../../shared/operators/debounce-unique.operator';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  search = new FormControl(this.storageService.receive(STORAGE_PHRASE_KEY));
  readonly searchIcon = faSearch;

  constructor(
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.search.valueChanges
      .pipe(debounceUnique(300))
      .subscribe((value: string) => this.onChange.emit(value));
  }

}
