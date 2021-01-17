import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

/* NgRx */
import { State } from './../../../state/app.state';
import { Store } from '@ngrx/store';
import {
  setQueryTitle,
  setPriceRange,
  setActiveShops,
  searchProducts,
} from './../../state/actions/search-page.actions';
import { getDomains } from './../../../domain/state/index';
import {
  getSearchLoadingStatus,
  getSearchProducts,
  getSearchPageSize,
  getSearchCurrentPage,
  getSearchNextPage,
  getSearchPrevPage,
} from './../../state/index';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  isLoading$ = this.store.select(getSearchLoadingStatus);
  products$ = this.store.select(getSearchProducts);
  numbers: number[];

  currentPage$ = this.store.select(getSearchCurrentPage);
  nextPage$ = this.store.select(getSearchNextPage);
  prevPage$ = this.store.select(getSearchPrevPage);
  pageSize$ = this.store.select(getSearchPageSize);
  changePageAction = searchProducts;

  constructor(private store: Store<State>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store
      .select(getSearchPageSize)
      .pipe(take(1))
      .subscribe(
        (pageSize) =>
          (this.numbers = Array(pageSize)
            .fill(0)
            .map((x, i) => i))
      );

    if (this.route.snapshot.queryParams['page']) {
      // this.searchQueryParams.currentPaginatedPage = this.route.snapshot.queryParams[
      //   'page'
      // ];
    }

    if (this.route.snapshot.queryParams['title']) {
      const title = this.route.snapshot.queryParams['title'];
      this.store.dispatch(setQueryTitle({ title }));
    }

    if (
      this.route.snapshot.queryParams['priceFrom'] &&
      this.route.snapshot.queryParams['priceTo']
    ) {
      const priceFrom = this.route.snapshot.queryParams['priceFrom'];
      const priceTo = this.route.snapshot.queryParams['priceTo'];
      this.store.dispatch(setPriceRange({ priceFrom, priceTo }));
    }
    if (this.route.snapshot.queryParams['shops']) {
      const shops = this.route.snapshot.queryParams['shops'];

      const shopsArr = JSON.parse(shops);

      this.store.select(getDomains).subscribe((domains) => {
        const shopsArray: {
          id: number;
          name: string;
          feeds?: { id: number }[];
        }[] = domains?.filter((domain) => shopsArr.includes(domain.id));

        const activeShopsNames = shopsArray?.map((shop) => shop.name);
        const activeShopsIds = shopsArray?.map((shop) => shop.id);

        const feedsToShearchArray = shopsArray?.map((shop) =>
          shop.feeds.map((feed) => feed.id)
        );
        const flatFeedsToSearchAray = feedsToShearchArray?.reduce(
          (acc, val) => acc.concat(val),
          []
        );
        if (flatFeedsToSearchAray && activeShopsIds && activeShopsNames) {
          this.store.dispatch(
            setActiveShops({
              shopsId: activeShopsIds,
              shopsNames: activeShopsNames,
              shopsFeedsId: flatFeedsToSearchAray,
            })
          );
          this.store.dispatch(searchProducts());
        }
      });
    }

    if (
      (this.route.snapshot.queryParams['priceFrom'] ||
        this.route.snapshot.queryParams['title']) &&
      !this.route.snapshot.queryParams['shops']
    ) {
      this.store.dispatch(searchProducts());
    }
  }

  filterDomain = (domain) => {
    console.log(domain.id);
  };
}
