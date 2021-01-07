import { Injectable } from '@angular/core';

/* NgRx*/
import { State } from './../../state/app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class CustomPaginationService {
  constructor(private store: Store<State>) {}

  getNextPage() {
    //increase current pageNumber by one
    return;
  }

  getPreviousPage() {
    //decrese current pageNumber by one
    return;
  }

  public getPageInNewSize() {
    // Set new page size and change page to first
    return;
  }
}
