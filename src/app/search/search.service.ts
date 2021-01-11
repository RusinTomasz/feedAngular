import { Injectable } from '@angular/core';

/* NgRx */
import { State } from './../state/app.state';
import { Store } from '@ngrx/store';
import { SearchPageActions } from 'src/app/search/state/actions';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private store: Store<State>) {}

  deactivateFilterSidenav() {
    this.store.dispatch(SearchPageActions.dectivateFilterSidenav());
  }
}
