/* NgRx */
import { createReducer, on } from '@ngrx/store';

import { DomainApiActions, DomainPageActions } from './actions';

// State for this feature (domain)
export interface DomainState {
  domains?: {
    id: number;
    name: string;
    feeds?: { id: string }[];
  }[];
  errors?: {
    getDomainsError?: string | null;
  };
  isDomainsLoading: boolean;
}

const initialState: DomainState = {
  isDomainsLoading: false,
};

export const domainReducer = createReducer<DomainState>(
  initialState,
  on(
    DomainPageActions.getDomainsNamesWithFeedsIds,
    (state): DomainState => {
      return {
        ...state,
        isDomainsLoading: true,
      };
    }
  ),
  on(
    DomainApiActions.getDomainsNamesWithFeedsIdsSuccess,
    (state, action): DomainState => {
      return {
        ...state,
        errors: { ...state.errors, getDomainsError: '' },
        domains: action.domains,
        isDomainsLoading: false,
      };
    }
  ),
  on(
    DomainApiActions.getDomainsNamesWithFeedsIdsFailure,
    (state, action): DomainState => {
      return {
        ...state,
        errors: { ...state.errors, getDomainsError: action.error },
        isDomainsLoading: false,
      };
    }
  )
);
