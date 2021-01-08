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
} from './../product/state/index';

/* RxJS */
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  // errorMessage$ = this.store.select(getLoginError);
  isLoading$ = this.store.select(getPrductsLoadingStatus);
  products$ = this.store.select(getProducts);
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
        ProductPageActions.paginationProductPage({
          pageNumber: currentPaginatedPage,
        })
      );
    } else {
      this.store.dispatch(ProductPageActions.getProducts());
    }
  }
}
