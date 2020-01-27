import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SeriesModule } from './series';
import { FiltersModule } from './filters';

@NgModule({
  imports: [
    CommonModule,
    SeriesModule,
    FiltersModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ]
})
export class RootStoreModule { }
