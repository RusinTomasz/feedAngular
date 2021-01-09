import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { SearchState } from './search.reducer';

export interface State extends AppState.State {
  search: SearchState;
}

// Selector functions
const getSearchFeatureState = createFeatureSelector<SearchState>('search');

//products
// export const getProducts = createSelector(
//     getSearchFeatureState,
//   (state) => state.products.rows
// );
