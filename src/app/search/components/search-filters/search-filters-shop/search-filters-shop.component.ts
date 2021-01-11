import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

/* NgRx */
import { State } from './../../../../state/app.state';
import { Store } from '@ngrx/store';
import { getDomains } from './../../../../domain/state/index';
import { SearchPageActions } from 'src/app/search/state/actions';

@Component({
  selector: 'app-search-filters-shop',
  templateUrl: './search-filters-shop.component.html',
  styleUrls: ['./search-filters-shop.component.scss'],
})
export class SearchFiltersShopComponent implements OnInit {
  domains$ = this.store.select(getDomains);
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

    this.filterShopForm.controls['domains'].setValue([], {
      onlySelf: true,
    });
  }

  onSubmit() {
    if (this.filterShopForm.status !== 'VALID') {
      return;
    }
    const shopsArray: number[] = this.filterShopForm.value.domains;

    [
      SearchPageActions.setActiveShops({ shops: shopsArray }),
      SearchPageActions.dectivateFilterSidenav(),
    ].forEach((a) => this.store.dispatch(a));

    const queryParams: any = {};
    queryParams.shops = JSON.stringify(shopsArray);

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
