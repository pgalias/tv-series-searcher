import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearcherModule } from '../searcher/searcher.module';
import { ContentComponent } from './content/content.component';
import { SeriesModule } from '../series/series.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ContentComponent],
  exports: [
    ContentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SearcherModule,
    SeriesModule,
  ]
})
export class ContentModule { }
