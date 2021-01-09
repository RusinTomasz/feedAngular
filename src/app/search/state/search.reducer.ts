/* NgRx */
import { createReducer, on } from '@ngrx/store';

import { SearchApiActions, SearchPageActions } from './actions';

// State for this feature (search)
export interface SearchState {
  errors?: {
    getProductsError?: string | null;
  };
}

const initialState: SearchState = {
  errors: {
    getProductsError: '',
  },
};

export const searchReducer = createReducer<SearchState>(
  initialState,

  on(
    SearchPageActions.getProducts,
    (state): SearchState => {
      return {
        ...state,
      };
    }
  )
);
