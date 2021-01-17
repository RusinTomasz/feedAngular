import { searchProductsFailure } from './actions/search-api.actions';
import { Injectable } from '@angular/core';

/* Interfaces */
import { ProductApiResponse } from './../../product/product';

/* Services */
import { SearchService } from './../search.service';

/* RxJs */
import { map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SearchPageActions, SearchApiActions } from './actions';

/* Interfaces */

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}

  searchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchPageActions.searchProducts),
      concatMap((action) =>
        this.searchService.searchProducts(action.currentPage).pipe(
          map(
            (results: { pagnatedSearchResults: ProductApiResponse }) =>
              results.pagnatedSearchResults
          ),
          tap((results: ProductApiResponse) => console.log(results)),
          map((results: ProductApiResponse) =>
            SearchApiActions.searchProductsSuccess({
              count: results.count,
              products: results.rows,
              nextPage: results.nextPage,
              prevPage: results.prevPage,
              currentPage: action.currentPage,
            })
          ),
          catchError((error) => {
            console.log(error);
            return of(SearchApiActions.searchProductsFailure({ error }));
          })
        )
      )
    );
  });
}
