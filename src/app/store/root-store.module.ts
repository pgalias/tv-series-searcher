import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesModule } from './series';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    SeriesModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ]
})
export class RootStoreModule { }
