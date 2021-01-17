import { Product } from '../../product';

/* NgRx */
import { createAction, props } from '@ngrx/store';

/* GetProducts */

export const getProductsFailure = createAction(
  '[Product API] Get Products Fail',
  props<{ error: string }>()
);

export const getPaginationProductPageSuccess = createAction(
  '[Product API] Get Next Product Page Success',
  props<{
    count: number;
    products: Product[];
    nextPage?: { page: number; limit: number };
    prevPage?: { page: number; limit: number };
    currentPage: number;
  }>()
);

export const setProductPageSizeSuccess = createAction(
  '[Product API] Set Product Page Size Success',
  props<{
    count: number;
    products: Product[];
    nextPage?: { page: number; limit: number };
    prevPage?: { page: number; limit: number };
    currentPage: number;
  }>()
);

export const setProductPageSizeFailure = createAction(
  '[Product API] Set Product Page Size Fail',
  props<{ error: string }>()
);
