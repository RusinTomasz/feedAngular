import { getCurrentlyActiveFilters } from './state/index';
import { Injectable } from '@angular/core';
import { SearchPageActions } from 'src/app/search/state/actions';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

/* RxJs */
import { catchError, take, map, tap, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

/* NgRx */
import { State } from './../state/app.state';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private projectsUrl = 'http://localhost:8080/search/products';
  private queryparams$ = this.store.select(getCurrentlyActiveFilters);

  constructor(private store: Store<State>, private http: HttpClient) {}

  deactivateFilterSidenav() {
    this.store.dispatch(SearchPageActions.dectivateFilterSidenav());
  }

  searchProducts(pageNumber: number = 1) {
    //Get pageSize
    // console.log('currentPage: ' + pageNumber);
    const pageSize = 16;

    return this.queryparams$.pipe(
      take(1),
      map((queryParams) => {
        let paramsObj = new HttpParams();

        if (queryParams.queryTitle) {
          paramsObj = paramsObj.append('title', queryParams.queryTitle);
        }
        if (queryParams.priceRange && queryParams.priceRange.priceFrom) {
          paramsObj = paramsObj.append(
            'priceFrom',
            `${queryParams.priceRange.priceFrom}`
          );
        }
        if (queryParams.priceRange && queryParams.priceRange.priceTo) {
          paramsObj = paramsObj.append(
            'priceTo',
            `${queryParams.priceRange.priceTo}`
          );
        }
        if (queryParams.shops && queryParams.shops.shopsFeedsId) {
          const shoopsFeedId = queryParams.shops.shopsFeedsId;
          if (shoopsFeedId.length) {
            const shoopsFeeIdString = JSON.stringify(shoopsFeedId);
            paramsObj = paramsObj.append('shops', shoopsFeeIdString);
          }
        }
        return paramsObj;
      }),
      mergeMap((paramsObj) => {
        return this.http
          .get(this.projectsUrl, { params: paramsObj })
          .pipe(catchError(this.handleError));
      })
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage =
      'Wystąpił błąd podczas wyszukiwania produktów, proszę spróbować ponownie.';
    if (!errorRes.error.error.message) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'A user with this email could not be found.':
        errorMessage = 'Użytkownik o podanym email nie istnieje.';
        break;
    }

    return throwError(errorMessage);
  }
}
