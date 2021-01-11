import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { SearchState } from './search.reducer';

export interface State extends AppState.State {
  search: SearchState;
}

// Selector functions
const getSearchFeatureState = createFeatureSelector<SearchState>('search');

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

export const getCurrentlyQueryTitle = createSelector(
  getSearchFeatureState,
  (state) => state.filters.queryTitle
);
