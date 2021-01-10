import { getCurrentlyOpenFilter } from './../../state/index';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { availableFilters } from './filters';

/* NgRx*/
import { State } from './../../../state/app.state';
import { Store } from '@ngrx/store';
import { SearchPageActions } from '../../state/actions';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchFiltersComponent implements OnInit {
  availableFilters = availableFilters;
  currentlyOpenFilter$ = this.store.select(getCurrentlyOpenFilter);

  constructor(private store: Store<State>) {}

  ngOnInit(): void {}

  deactivateFilterSidenav() {
    this.store.dispatch(SearchPageActions.dectivateFilterSidenav());
  }
}
