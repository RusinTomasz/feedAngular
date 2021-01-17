import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

/* NgRx */
import { Store } from '@ngrx/store';
import { State } from './../../../../state/app.state';
import {
  searchProducts,
  dectivateFilterSidenav,
  setPriceRange,
} from './../../../state/actions/search-page.actions';
import { getCurrentlyActivePriceRange } from './../../../state/index';

@Component({
  selector: 'app-search-filters-price',
  templateUrl: './search-filters-price.component.html',
  styleUrls: ['./search-filters-price.component.scss'],
})
export class SearchFiltersPriceComponent implements OnInit, OnDestroy {
  filterPriceForm: FormGroup;

  activeFilterPriceRange$ = this.store.select(getCurrentlyActivePriceRange);

  activeFilterPriceRange: Subscription;

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

    this.activeFilterPriceRange = this.activeFilterPriceRange$.subscribe(
      (priceRange) => {
        this.filterPriceForm.controls['priceFrom'].setValue(
          priceRange.priceFrom,
          {
            onlySelf: true,
          }
        );
        this.filterPriceForm.controls['priceTo'].setValue(priceRange.priceTo, {
          onlySelf: true,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.activeFilterPriceRange.unsubscribe();
  }

  resetFilter(): void {
    this.filterPriceForm.reset();

    const priceFrom = null;
    const priceTo = null;

    [
      setPriceRange({ priceFrom, priceTo }),
      dectivateFilterSidenav(),
      searchProducts(),
    ].forEach((a) => this.store.dispatch(a));

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { priceFrom, priceTo },
      queryParamsHandling: 'merge',
    });
  }

  onSubmit() {
    if (this.filterPriceForm.status !== 'VALID') {
      return;
    }

    if (!this.filterPriceForm.touched) {
      this.store.dispatch(dectivateFilterSidenav());
      return;
    }

    let priceFrom: number = this.filterPriceForm.value.priceFrom;
    let priceTo: number = this.filterPriceForm.value.priceTo;

    if (!priceFrom && priceTo) {
      priceFrom = 1;
    }

    if (!priceTo && priceFrom) {
      priceTo = 9999999;
    } else if (priceTo < priceFrom) {
      priceTo = priceFrom;
    }

    [
      setPriceRange({ priceFrom, priceTo }),
      dectivateFilterSidenav(),
      searchProducts(),
    ].forEach((a) => this.store.dispatch(a));

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { priceFrom, priceTo },
      queryParamsHandling: 'merge',
    });
  }
}
