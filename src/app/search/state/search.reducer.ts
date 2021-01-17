import { setSearchPageSize } from './actions/search-page.actions';
import { Product } from './../../product/product';
/* NgRx */
import { createReducer, on } from '@ngrx/store';

import { SearchApiActions, SearchPageActions } from './actions';

// State for this feature (search)
export interface SearchState {
  isActiveFilterSidenav: boolean;
  currentlyOpenFilter: string;
  products: {
    count: number;
    rows: Product[];
    nextPage?: { page: number; limit: number };
    prevPage?: { page: number; limit: number };
  };
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
  products: {
    count: 0,
    rows: [],
  },
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
    SearchPageActions.setSearchPageSize,
    (state, action): SearchState => {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pageSize: action.pageSize,
        },
      };
    }
  ),
  on(
    SearchApiActions.setSearchPageSizeSuccess,
    (state, action): SearchState => {
      return {
        ...state,
        products: {
          count: action.count,
          rows: action.products,
          nextPage: action.nextPage,
          prevPage: action.prevPage,
        },
        pagination: { ...state.pagination, currentPage: action.currentPage },
        errors: { ...state.errors, searchProductsError: '' },
        isLoading: false,
      };
    }
  ),
  on(
    SearchApiActions.setSearchPageSizeFailure,
    (state, action): SearchState => {
      return {
        ...state,
        errors: { ...state.errors, searchProductsError: action.error },
        isLoading: false,
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
        isLoading: true,
      };
    }
  ),
  on(
    SearchApiActions.searchProductsSuccess,
    (state, action): SearchState => {
      return {
        ...state,
        products: {
          count: action.count,
          rows: action.products,
          nextPage: action.nextPage,
          prevPage: action.prevPage,
        },
        pagination: { ...state.pagination, currentPage: action.currentPage },
        errors: { ...state.errors, searchProductsError: '' },
        isLoading: false,
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
