import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SearcherComponent } from './searcher/searcher.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SearcherComponent, SearchBarComponent],
  exports: [
    SearcherComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ]
})
export class SearcherModule { }
