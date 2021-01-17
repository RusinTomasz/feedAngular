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
  pagination: {
    currentPage: number;
    pageSize: number;
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
  pagination: {
    currentPage: 1,
    pageSize: 16,
  },
  isLoading: false,
};

export const productReducer = createReducer<ProductState>(
  initialState,

  on(
    ProductApiActions.getProductsFailure,
    (state, action): ProductState => {
      return {
        ...state,
        errors: { ...state.errors, getProductsError: action.error },
        isLoading: false,
      };
    }
  ),
  on(
    ProductPageActions.paginationProductPage,
    (state): ProductState => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    ProductApiActions.getPaginationProductPageSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        products: {
          count: action.count,
          rows: action.products,
          nextPage: action.nextPage,
          prevPage: action.prevPage,
        },
        pagination: { ...state.pagination, currentPage: action.currentPage },
        errors: { ...state.errors, getProductsError: '' },
        isLoading: false,
      };
    }
  ),
  on(
    ProductPageActions.setProductPageSize,
    (state, action): ProductState => {
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
    ProductApiActions.setProductPageSizeSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        products: {
          count: action.count,
          rows: action.products,
          nextPage: action.nextPage,
          prevPage: action.prevPage,
        },
        pagination: { ...state.pagination, currentPage: action.currentPage },
        errors: { ...state.errors, getProductsError: '' },
        isLoading: false,
      };
    }
  ),
  on(
    ProductApiActions.setProductPageSizeFailure,
    (state, action): ProductState => {
      return {
        ...state,
        errors: { ...state.errors, getProductsError: action.error },
        isLoading: false,
      };
    }
  )
);
