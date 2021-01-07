import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { ProductState } from './product.reducer';

export interface State extends AppState.State {
  product: ProductState;
}

// Selector functions
const getProductFeatureState = createFeatureSelector<ProductState>('product');

//products
export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products.rows
);

export const getPrductsLoadingStatus = createSelector(
  getProductFeatureState,
  (state) => state.isLoading
);

//Pagination

export const getNextPage = createSelector(
  getProductFeatureState,
  (state) => state.products.nextPage
);

export const getPrevPage = createSelector(
  getProductFeatureState,
  (state) => state.products.prevPage
);

export const getCurrentPage = createSelector(
  getProductFeatureState,
  (state) => state.pagination.currentPage
);

export const getPageSize = createSelector(
  getProductFeatureState,
  (state) => state.pagination.pageSize
);
