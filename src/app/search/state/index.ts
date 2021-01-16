import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { SearchState } from './search.reducer';

export interface State extends AppState.State {
  search: SearchState;
}

// Selector functions
const getSearchFeatureState = createFeatureSelector<SearchState>('search');

//searched products
export const getSearchProducts = createSelector(
  getSearchFeatureState,
  (state) => state.products.rows
);

//filter sidenav

export const getFilterSidenavStatus = createSelector(
  getSearchFeatureState,
  (state) => state.isActiveFilterSidenav
);

export const getCurrentlyOpenFilter = createSelector(
  getSearchFeatureState,
  (state) => state.currentlyOpenFilter
);

//ActiveFilters

export const getCurrentlyActiveFilters = createSelector(
  getSearchFeatureState,
  (state) => state.filters
);

export const getCurrentlyActiveQueryTitle = createSelector(
  getSearchFeatureState,
  (state) => state.filters.queryTitle
);

export const getCurrentlyActivePriceRange = createSelector(
  getSearchFeatureState,
  (state) => state.filters.priceRange
);

export const getCurrentlyActiveShops = createSelector(
  getSearchFeatureState,
  (state) => state.filters.shops
);

//Loading Status

export const getSearchLoadingStatus = createSelector(
  getSearchFeatureState,
  (state) => state.isLoading
);

//Pagination

export const getSearchNextPage = createSelector(
  getSearchFeatureState,
  (state) => state.products.nextPage
);

export const getSearchPrevPage = createSelector(
  getSearchFeatureState,
  (state) => state.products.prevPage
);

export const getSearchCurrentPage = createSelector(
  getSearchFeatureState,
  (state) => state.pagination.currentPage
);

export const getSearchPageSize = createSelector(
  getSearchFeatureState,
  (state) => state.pagination.pageSize
);
