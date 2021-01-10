/* NgRx */
import { createAction } from '@ngrx/store';
import { props } from '@ngrx/store';

/* Filter Sidenav */
export const activateFilterSidenav = createAction(
  '[Product Page] Activate Filter Sidenav',
  props<{ filtrType: string }>()
);

export const dectivateFilterSidenav = createAction(
  '[Product Page] Deactivate Filter Sidenav'
);
