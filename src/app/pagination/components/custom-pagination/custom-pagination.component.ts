import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

/* NgRx*/
import { State } from './../../../state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomPaginationComponent implements OnInit {
  pageSizes: Number[] = [8, 16, 24];

  constructor(
    private store: Store<State>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  @Input('currentPage') currentPage$: Observable<any>;
  @Input('nextPage') nextPage$: Observable<any>;
  @Input('prevPage') prevPage$: Observable<any>;
  @Input('pageSize') pageSize$: Observable<any>;
  @Input('changePageAction') changePageAction: any;
  @Input('changePageSizeAction') changePageSizeAction: any;

  ngOnInit(): void {}

  nextPage(): void {
    this.currentPage$
      .pipe(
        take(1),
        map((currentPage) => +currentPage + 1)
      )
      .subscribe((page) => this.store.dispatch(this.changePageAction(page)));
  }

  preventDefault(event): void {
    event.preventDefault();
  }

  previousPage(): void {
    this.currentPage$
      .pipe(
        take(1),
        map((currentPage) => +currentPage - 1)
      )
      .subscribe((page) => this.store.dispatch(this.changePageAction(page)));
  }

  updatePageSize(pageSize: Number): void {
    this.store.dispatch(this.changePageSizeAction({ pageSize }));
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: null },
      queryParamsHandling: 'merge',
    });
  }
}
