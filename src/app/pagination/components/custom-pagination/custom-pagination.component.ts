import { take, map } from 'rxjs/operators';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

/* NgRx*/
import { State } from './../../../state/app.state';
import { Store } from '@ngrx/store';
import {
  getNextPage,
  getPrevPage,
  getCurrentPage,
  getPageSize,
} from './../../../product/state/index';
import { ProductPageActions } from 'src/app/product/state/actions';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomPaginationComponent implements OnInit {
  pageSizes: Number[] = [16, 25, 55];

  constructor(private store: Store<State>) {}

  nextPage$ = this.store.select(getNextPage);
  prevPage$ = this.store.select(getPrevPage);
  currentPage$ = this.store.select(getCurrentPage);
  pageSize$ = this.store.select(getPageSize);
  selectedpageSize = 16;

  ngOnInit(): void {}

  nextPage(): void {
    this.store
      .select(getCurrentPage)
      .pipe(
        take(1),
        map((currentPage) => +currentPage + 1)
      )
      .subscribe((page) =>
        this.store.dispatch(
          ProductPageActions.paginationProductPage({ pageNumber: page })
        )
      );
  }

  preventDefault(event): void {
    event.preventDefault();
  }

  previousPage(): void {
    this.store
      .select(getCurrentPage)
      .pipe(
        take(1),
        map((currentPage) => +currentPage - 1)
      )
      .subscribe((page) =>
        this.store.dispatch(
          ProductPageActions.paginationProductPage({ pageNumber: page })
        )
      );
  }

  updatePageSize(pageSize: Number): void {
    console.log(pageSize);
  }
}
