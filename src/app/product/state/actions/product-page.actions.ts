/* NgRx */
import { createAction } from '@ngrx/store';

/* Get Products */

export const paginationProductPage = createAction(
  '[Product Page] Pgination Product Page',
  (currentPage: number = 1) => ({ currentPage })
);
