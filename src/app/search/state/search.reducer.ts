/* NgRx */
import { createReducer, on } from '@ngrx/store';

import { SearchApiActions, SearchPageActions } from './actions';

// State for this feature (search)
export interface SearchState {
  isActiveFilterSidenav: boolean;
  currentlyOpenFilter: string;
}

const initialState: SearchState = {
  isActiveFilterSidenav: false,
  currentlyOpenFilter: '',
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
  )
);
