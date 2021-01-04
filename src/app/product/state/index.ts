import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { ProductState } from './product.reducer';

export interface State extends AppState.State {
  product: ProductState;
}

// Selector functions
const getAuthFeatureState = createFeatureSelector<ProductState>('product');

// export const getLoginError = createSelector(
//   getAuthFeatureState,
//   (state) => state.errors.loginError
// );
