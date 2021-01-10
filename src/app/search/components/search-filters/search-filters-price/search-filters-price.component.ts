import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-search-filters-price',
  templateUrl: './search-filters-price.component.html',
  styleUrls: ['./search-filters-price.component.scss'],
})
export class SearchFiltersPriceComponent implements OnInit {
  filterPriceForm: FormGroup;
  value = 'Clear me';
  constructor(private formBuilder: FormBuilder) {}

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

    // console.log(this.searchForm.value.query);

    // this.store.dispatch(
    //   AuthPageActions.loginUser({
    //     email: this.loginForm.value.email,
    //     password: this.loginForm.value.password,
    //   })
    // );
  }
}
