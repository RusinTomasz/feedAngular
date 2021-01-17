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
  '[Search API] Set Search Page Size Success',
  props<{
    count: number;
    products: Product[];
    nextPage?: { page: number; limit: number };
    prevPage?: { page: number; limit: number };
    currentPage: number;
  }>()
);

export const setProductPageSizeFailure = createAction(
  '[Search API] Set Search Page Size Fail',
  props<{ error: string }>()
);
