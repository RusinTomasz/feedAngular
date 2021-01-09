/* NgRx */
import { createReducer, on } from '@ngrx/store';

import { SearchApiActions, SearchPageActions } from './actions';

// State for this feature (search)
export interface SearchState {
  isActiveFilterSidenav: boolean;
}

const initialState: SearchState = {
  isActiveFilterSidenav: false,
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
