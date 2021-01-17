import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

/* NgRx */
import { State } from './../../../../state/app.state';
import { Store } from '@ngrx/store';
import { getDomains } from './../../../../domain/state/index';
import {
  searchProducts,
  dectivateFilterSidenav,
  setActiveShops,
} from './../../../state/actions/search-page.actions';
import { getCurrentlyActiveShops } from './../../../state/index';

@Component({
  selector: 'app-search-filters-shop',
  templateUrl: './search-filters-shop.component.html',
  styleUrls: ['./search-filters-shop.component.scss'],
})
export class SearchFiltersShopComponent implements OnInit {
  domains$ = this.store.select(getDomains);
  activeFilterShops$ = this.store.select(getCurrentlyActiveShops);
  activeFilterShops: Subscription;
  filterShopForm: FormGroup;
  constructor(
    private store: Store<State>,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.filterShopForm = this.formBuilder.group({
      domains: [],
    });
  }

  resetFilter(): void {
    this.filterShopForm.reset();

    [
      setActiveShops({
        shopsId: [],
        shopsNames: [],
        shopsFeedsId: [],
      }),
      dectivateFilterSidenav(),
      searchProducts(),
    ].forEach((a) => this.store.dispatch(a));

    const queryParams: any = { shops: null };
    queryParams.page = null;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onSubmit() {
    if (this.filterShopForm.status !== 'VALID') {
      return;
    }

    if (!this.filterShopForm.touched) {
      this.store.dispatch(dectivateFilterSidenav());
      return;
    }

    console.log(this.filterShopForm);

    const shopsArray: {
      id: number;
      name: string;
      feeds: { id: number }[];
    }[] = this.filterShopForm.value.domains;

    const activeShopsNames = shopsArray.map((shop) => shop.name);
    const activeShopsIds = shopsArray.map((shop) => shop.id);

    const feedsToShearchArray = shopsArray.map((shop) =>
      shop.feeds.map((feed) => feed.id)
    );
    const flatFeedsToSearchAray = feedsToShearchArray.reduce(
      (acc, val) => acc.concat(val),
      []
    );

    [
      setActiveShops({
        shopsId: activeShopsIds,
        shopsNames: activeShopsNames,
        shopsFeedsId: flatFeedsToSearchAray,
      }),
      dectivateFilterSidenav(),
      searchProducts(),
    ].forEach((a) => this.store.dispatch(a));

    const queryParams: any = {};
    queryParams.page = null;

    if (activeShopsIds.length) {
      queryParams.shops = JSON.stringify(activeShopsIds);
    } else {
      queryParams.shops = null;
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
