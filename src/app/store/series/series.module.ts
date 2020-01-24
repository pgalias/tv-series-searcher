import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './series.reducers';
import { SeriesEffects } from './series.effects';
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    StoreModule.forFeature('series', reducer),
    EffectsModule.forFeature([SeriesEffects])
  ],
  providers: [
    SeriesEffects,
  ]
})
export class SeriesModule { }
