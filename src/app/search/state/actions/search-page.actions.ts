/* NgRx */
import { createAction } from '@ngrx/store';
import { props } from '@ngrx/store';

/* Filter Sidenav */
export const activateFilterSidenav = createAction(
  '[Search Page] Activate Filter Sidenav',
  props<{ filtrType: string }>()
);

export const dectivateFilterSidenav = createAction(
  '[Search Page] Deactivate Filter Sidenav'
);

/* Filters */

export const setActiveShops = createAction(
  '[Search Page] Set Active Shops',
  props<{ shops: number[] }>()
);

export const setPriceRange = createAction(
  '[Search Page] Set Price Range',
  props<{ priceFrom: number; priceTo: number }>()
);

export const setQueryTitle = createAction(
  '[Search Page] Set Query Title',
  props<{ title: string }>()
);
