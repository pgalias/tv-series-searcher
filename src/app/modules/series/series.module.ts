import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ListComponent, ListItemComponent],
  exports: [
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class SeriesModule { }
