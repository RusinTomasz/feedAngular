import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

/*NgRx*/
import { State } from './../state/app.state';
import { Store } from '@ngrx/store';
import { ProductPageActions } from '../product/state/actions';
import {
  getProducts,
  getPageSize,
  getPrductsLoadingStatus,
  getCurrentPage,
  getNextPage,
  getPrevPage,
} from './../product/state/index';

/* RxJS */
import { take } from 'rxjs/operators';

/* Test */

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  // errorMessage$ = this.store.select(getLoginError);
  isLoading$ = this.store.select(getPrductsLoadingStatus);
  products$ = this.store.select(getProducts);

  currentPage$ = this.store.select(getCurrentPage);
  nextPage$ = this.store.select(getNextPage);
  prevPage$ = this.store.select(getPrevPage);
  pageSize$ = this.store.select(getPageSize);
  changePageAction = ProductPageActions.paginationProductPage;
  changePageSizeAction = ProductPageActions.setProductPageSize;

  numbers: number[];
  constructor(private store: Store<State>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store
      .select(getPageSize)
      .pipe(take(1))
      .subscribe(
        (pageSize) =>
          (this.numbers = Array(pageSize)
            .fill(0)
            .map((x, i) => i))
      );

    if (this.route.snapshot.queryParams['page']) {
      const currentPaginatedPage = this.route.snapshot.queryParams['page'];
      this.store.dispatch(
        ProductPageActions.paginationProductPage(currentPaginatedPage)
      );
    } else {
      this.store.dispatch(ProductPageActions.paginationProductPage());
    }
  }
}
