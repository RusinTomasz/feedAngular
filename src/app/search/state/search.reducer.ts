/* NgRx */
import { createReducer, on } from '@ngrx/store';

import { SearchApiActions, SearchPageActions } from './actions';

// State for this feature (search)
export interface SearchState {
  isActiveFilterSidenav: boolean;
  currentlyOpenFilter: string;
  filters: {
    shops?: {
      shopsId?: number[];
      shopsNames?: string[];
      shopsFeedsId?: number[];
    };
    priceRange?: { priceFrom: number; priceTo: number };
    queryTitle: string;
  };
  errors?: {
    searchProductsError?: string | null;
  };
  pagination: {
    currentPage: number;
    pageSize: number;
  };
  isLoading: boolean;
}

const initialState: SearchState = {
  isActiveFilterSidenav: false,
  currentlyOpenFilter: '',
  filters: {
    queryTitle: '',
    shops: {
      shopsId: [],
      shopsNames: [],
      shopsFeedsId: [],
    },
    priceRange: { priceFrom: null, priceTo: null },
  },
  pagination: {
    currentPage: 1,
    pageSize: 16,
  },
  isLoading: false,
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
    SearchPageActions.setSearchFeedsId,
    (state, action): SearchState => {
      return {
        ...state,
        filters: {
          ...state.filters,
          shops: { shopsFeedsId: action.shopsFeedsId },
        },
      };
    }
  ),
  on(
    SearchPageActions.setActiveShops,
    (state, action): SearchState => {
      return {
        ...state,
        filters: {
          ...state.filters,
          shops: {
            shopsId: action.shopsId,
            shopsNames: action.shopsNames,
            shopsFeedsId: action.shopsFeedsId,
          },
        },
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
    SearchPageActions.searchProducts,
    (state): SearchState => {
      return {
        ...state,
      };
    }
  ),
  on(
    SearchApiActions.searchProductsSuccess,
    (state): SearchState => {
      return {
        ...state,
      };
    }
  ),
  on(
    SearchApiActions.searchProductsFailure,
    (state, action): SearchState => {
      return {
        ...state,
        errors: { ...state.errors, searchProductsError: action.error },
        isLoading: false,
      };
    }
  )
);
