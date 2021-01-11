import { DomainState } from './domain.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
  search: DomainState;
}

// Selector functions
const getDomainFeatureState = createFeatureSelector<DomainState>('domain');

export const getDomains = createSelector(
  getDomainFeatureState,
  (state) => state.domains
);
