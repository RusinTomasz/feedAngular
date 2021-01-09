/* NgRx */
import { createAction, props } from '@ngrx/store';

/* GetProducts */
export const getProductsFailure = createAction(
  '[Product API] Get Products Fail',
  props<{ error: string }>()
);


