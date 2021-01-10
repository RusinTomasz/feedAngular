/* NgRx */
import { createAction, props } from '@ngrx/store';

export const getDomainsNamesWithFeedsIdsSuccess = createAction(
  '[Domain API] Get Domains Names With Feeds Ids Success',
  props<{
    domains: {
      id: number;
      name: string;
      feeds?: { id: string }[];
    }[];
  }>()
);

export const getDomainsNamesWithFeedsIdsFailure = createAction(
  '[Domain API] Get Domains Names With Feeds Ids Fail',
  props<{ error: string }>()
);
