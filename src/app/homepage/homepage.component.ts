import { CustomPaginationService } from './../pagination/services/custom-pagination.service';
import { State } from './../state/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ProductPageActions } from '../product/state/actions';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.getProducts());
  }
}
