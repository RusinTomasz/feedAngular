import { availableFilters } from './../search-filters/filters';
import { Component, OnInit } from '@angular/core';

/* NgRx*/
import { Store } from '@ngrx/store';
import { State } from './../../../state/app.state';
import { getFilterSidenavStatus } from './../../state/index';
import { SearchPageActions } from '../../state/actions';

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.scss'],
})
export class SearchSidebarComponent implements OnInit {
  availableFilters = availableFilters;

  shopFilter = 'shop';

  isFilterSidenavActive$ = this.store.select(getFilterSidenavStatus);

  constructor(private store: Store<State>) {}

  ngOnInit(): void {}

  openFiltr(filtrType: string) {
    this.store.dispatch(
      SearchPageActions.activateFilterSidenav({
        filtrType,
      })
    );
  }
}
