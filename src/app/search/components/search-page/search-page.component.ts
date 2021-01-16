import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core'; /* NgRx */

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
import { SearchPageActions } from 'src/app/search/state/actions';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  constructor(private store: Store<State>, private route: ActivatedRoute) {}

  ngOnInit(): void {
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
