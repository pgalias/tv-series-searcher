import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowDirective } from './directives/row.directive';
import { ColumnDirective } from './directives/column.directive';
import { InputWrapperComponent } from './components/input-wrapper/input-wrapper.component';

@NgModule({
  declarations: [
    RowDirective,
    ColumnDirective,
    InputWrapperComponent,
  ],
  exports: [
    RowDirective,
    ColumnDirective,
    InputWrapperComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
