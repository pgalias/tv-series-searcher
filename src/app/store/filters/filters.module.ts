import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './filters.reducers';
import { FiltersEffects } from './filters.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('filters', reducer),
    EffectsModule.forFeature([FiltersEffects]),
  ],
  providers: [
    FiltersEffects,
  ],
})
export class FiltersModule { }
