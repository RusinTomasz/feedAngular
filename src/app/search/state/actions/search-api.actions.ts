import { Product } from './../../../product/product';
/* NgRx */
import { createAction, props } from '@ngrx/store';

export const searchProductsSuccess = createAction(
  '[Search API] Search Products Success',
  props<{
    count: number;
    products: Product[];
    nextPage?: { page: number; limit: number };
    prevPage?: { page: number; limit: number };
    currentPage: number;
  }>()
);

export const searchProductsFailure = createAction(
  '[Search API] Search Products Fail',
  props<{ error: string }>()
);

export const setSearchPageSizeSuccess = createAction(
  '[Search API] Set Search Page Size Success',
  props<{
    count: number;
    products: Product[];
    nextPage?: { page: number; limit: number };
    prevPage?: { page: number; limit: number };
    currentPage: number;
  }>()
);

export const setSearchPageSizeFailure = createAction(
  '[Search API] Set Search Page Size Fail',
  props<{ error: string }>()
);
