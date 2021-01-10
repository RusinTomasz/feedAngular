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
