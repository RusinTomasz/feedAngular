import { Product } from '../../product';

/* NgRx */
import { createAction, props } from '@ngrx/store';

/* GetProducts */

export const getProductsSuccess = createAction(
  '[Product API] Get Products Success',
  props<{
    count: number;
    products: Product[];
    nextPage?: { page: number; limit: number };
    prevPage?: { page: number; limit: number };
  }>()
);

export const getProductsFailure = createAction(
  '[Product API] Get Products Fail',
  props<{ error: string }>()
);
