/* NgRx */
import { createAction } from '@ngrx/store';
import { props } from '@ngrx/store';

/* Get Products */
export const getProducts = createAction('[Product Page] Get products');

export const paginationProductPage = createAction(
  '[Product Page] Next Product Page',
  props<{ pageNumber: number }>()
);

export const prevProductPage = createAction('[Product Page] Prev Product Page');
