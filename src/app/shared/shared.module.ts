import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowDirective } from './directives/row.directive';
import { ColumnDirective } from './directives/column.directive';
import { InputWrapperComponent } from './components/input-wrapper/input-wrapper.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    RowDirective,
    ColumnDirective,
    InputWrapperComponent,
    SpinnerComponent,
  ],
  exports: [
    RowDirective,
    ColumnDirective,
    InputWrapperComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
