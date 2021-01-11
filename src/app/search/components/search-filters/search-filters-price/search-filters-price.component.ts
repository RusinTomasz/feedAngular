import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

/* NgRx */
import { Store } from '@ngrx/store';
import { State } from './../../../../state/app.state';
import { SearchPageActions } from 'src/app/search/state/actions';

@Component({
  selector: 'app-search-filters-price',
  templateUrl: './search-filters-price.component.html',
  styleUrls: ['./search-filters-price.component.scss'],
})
export class SearchFiltersPriceComponent implements OnInit {
  filterPriceForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<State>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.filterPriceForm = this.formBuilder.group({
      priceFrom: null,
      priceTo: null,
    });
  }

  onSubmit() {
    if (this.filterPriceForm.status !== 'VALID') {
      return;
    }

    let priceFrom: number = this.filterPriceForm.value.priceFrom;
    let priceTo: number = this.filterPriceForm.value.priceTo;

    if (!priceFrom && priceTo) {
      priceFrom = 0;
    }

    if (!priceTo && priceFrom) {
      priceTo = 9999999;
    } else if (priceTo < priceFrom) {
      priceTo = priceFrom;
    }

    [
      SearchPageActions.setPriceRange({ priceFrom, priceTo }),
      SearchPageActions.dectivateFilterSidenav(),
    ].forEach((a) => this.store.dispatch(a));

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { priceFrom, priceTo },
      queryParamsHandling: 'merge',
    });
  }
}
