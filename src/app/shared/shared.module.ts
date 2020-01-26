import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RowDirective } from './directives/row.directive';
import { ColumnDirective } from './directives/column.directive';
import { InputWrapperComponent } from './components/input-wrapper/input-wrapper.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FavouriteButtonComponent } from './components/favourite-button/favourite-button.component';
import { LinkComponent } from './components/link/link.component';

@NgModule({
  declarations: [
    RowDirective,
    ColumnDirective,
    InputWrapperComponent,
    SpinnerComponent,
    TruncatePipe,
    FavouriteButtonComponent,
    LinkComponent,
  ],
  exports: [
    RowDirective,
    ColumnDirective,
    InputWrapperComponent,
    SpinnerComponent,
    TruncatePipe,
    FavouriteButtonComponent,
    LinkComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ]
})
export class SharedModule { }
