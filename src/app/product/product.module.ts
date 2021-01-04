import { ThemeSharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* NgRx */
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effects';
import { productReducer } from './state/product.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [
    ThemeSharedModule,
    CommonModule,
    //NgRx
    StoreModule.forFeature('product', productReducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
})
export class ProductModule {}
