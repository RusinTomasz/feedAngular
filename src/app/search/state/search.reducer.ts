/* NgRx */
import { createReducer, on } from '@ngrx/store';

import { SearchApiActions, SearchPageActions } from './actions';

// State for this feature (search)
export interface SearchState {
  isActiveFilterSidenav: boolean;
  currentlyOpenFilter: string;
  filters: {
    selectedShops?: number[];
    priceRange?: { priceFrom: number; priceTo: number };
    queryTitle: string;
  };
}

const initialState: SearchState = {
  isActiveFilterSidenav: false,
  currentlyOpenFilter: '',
  filters: {
    queryTitle: '',
  },
};

export const searchReducer = createReducer<SearchState>(
  initialState,
  on(
    SearchPageActions.activateFilterSidenav,
    (state, action): SearchState => {
      return {
        ...state,
        isActiveFilterSidenav: true,
        currentlyOpenFilter: action.filtrType,
      };
    }
  ),
  on(
    SearchPageActions.dectivateFilterSidenav,
    (state): SearchState => {
      return {
        ...state,
        isActiveFilterSidenav: false,
      };
    }
  ),
  on(
    SearchPageActions.setActiveShops,
    (state, action): SearchState => {
      return {
        ...state,
        filters: { ...state.filters, selectedShops: action.shops },
      };
    }
  ),
  on(
    SearchApiActions.setActiveShopsSuccess,
    (state): SearchState => {
      return {
        ...state,
      };
    }
  ),
  on(
    SearchApiActions.setActiveShopsFailure,
    (state): SearchState => {
      return {
        ...state,
      };
    }
  ),
  on(
    SearchPageActions.setPriceRange,
    (state, action): SearchState => {
      return {
        ...state,
        filters: {
          ...state.filters,
          priceRange: { priceFrom: action.priceFrom, priceTo: action.priceTo },
        },
      };
    }
  ),
  on(
    SearchApiActions.setPriceRangeSuccess,
    (state): SearchState => {
      return {
        ...state,
      };
    }
  ),
  on(
    SearchApiActions.setPriceRangeFailure,
    (state): SearchState => {
      return {
        ...state,
      };
    }
  ),
  on(
    SearchPageActions.setQueryTitle,
    (state, action): SearchState => {
      return {
        ...state,
        filters: {
          ...state.filters,
          queryTitle: action.title,
        },
      };
    }
  ),
  on(
    SearchApiActions.setQueryTitleSuccess,
    (state): SearchState => {
      return {
        ...state,
      };
    }
  ),
  on(
    SearchApiActions.setQueryTitleFailure,
    (state): SearchState => {
      return {
        ...state,
      };
    }
  )
);
