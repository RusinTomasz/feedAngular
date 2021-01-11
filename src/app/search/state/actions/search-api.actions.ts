/* NgRx */
import { createAction, props } from '@ngrx/store';

export const setActiveShopsSuccess = createAction(
  '[Search API] Set Active Shops Success'
);

export const setActiveShopsFailure = createAction(
  '[Search API] Set Active Shops Fail'
);

export const setPriceRangeSuccess = createAction(
  '[Search API] Set price Range Success'
);

export const setPriceRangeFailure = createAction(
  '[Search API] Set price Range Fail'
);

export const setQueryTitleSuccess = createAction(
  '[Search API] Set Query Title Success'
);

export const setQueryTitleFailure = createAction(
  '[Search API] Set Query Title Fail'
);
