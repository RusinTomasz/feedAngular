import { props } from '@ngrx/store';
/* NgRx */
import { createAction } from '@ngrx/store';

/* Get Products */

export const paginationProductPage = createAction(
  '[Product Page] Pgination Product Page',
  (currentPage: number = 1) => ({ currentPage })
);

export const setProductPageSize = createAction(
  '[Product Page] Set Product Page Size',
  props<{ pageSize: number }>()
);
