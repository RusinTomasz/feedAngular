import { Injectable } from '@angular/core';

/* Services */
import { ProductService } from './../product.service';

/* RxJs */
import { map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductPageActions, ProductApiActions } from './actions';

/* Interfaces */
import { ProductApiResponse } from '../product';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}


  getPaginationProductPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.paginationProductPage),
      concatMap((action) =>
        this.productService.getProducts(+action.currentPage).pipe(
          map((results: { products: ProductApiResponse }) => results.products),
          tap((results: ProductApiResponse) => console.log(results)),
          map((results: ProductApiResponse) =>
            ProductApiActions.getPaginationProductPageSuccess({
              count: results.count,
              products: results.rows,
              nextPage: results.nextPage,
              prevPage: results.prevPage,
              currentPage: +action.currentPage,
            })
          ),
          catchError((error) =>
            of(ProductApiActions.getProductsFailure({ error }))
          )
        )
      )
    );
  });
}
