/* NgRx */
import { createReducer, on } from '@ngrx/store';

/* Interfaces */
import { Product } from '../product';

import { ProductApiActions, ProductPageActions } from './actions';

// State for this feature (product)
export interface ProductState {
  products: {
    count: number;
    rows: Product[];
    nextPage?: { page: number; limit: number };
    prevPage?: { page: number; limit: number };
  };
  errors?: {
    getProductsError?: string | null;
  };
  isLoading: boolean;
}

const initialState: ProductState = {
  products: {
    count: 0,
    rows: [],
  },
  errors: {
    getProductsError: '',
  },
  isLoading: false,
};

export const productReducer = createReducer<ProductState>(
  initialState,

  on(
    ProductPageActions.getProducts,
    (state): ProductState => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    ProductApiActions.getProductsSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        products: {
          count: action.count,
          rows: action.products,
          nextPage: action.nextPage,
          prevPage: action.prevPage,
        },
        errors: { ...state.errors, getProductsError: '' },
        isLoading: false,
      };
    }
  ),
  on(
    ProductApiActions.getProductsFailure,
    (state, action): ProductState => {
      return {
        ...state,
        errors: { ...state.errors, getProductsError: action.error },
        isLoading: false,
      };
    }
  )
);
