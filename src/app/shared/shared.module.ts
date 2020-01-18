import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowDirective } from './directives/row.directive';
import { ColumnDirective } from './directives/column.directive';

@NgModule({
  declarations: [RowDirective, ColumnDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
