import { Injectable } from '@angular/core';

/* Services */
import { DomainService } from './../domain.service';

/* RxJs */
import { map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DomainPageActions, DomainApiActions } from './actions';

/* Interfaces */
import { DomainApiResponse } from './../domain';

@Injectable()
export class DomainEffects {
  constructor(
    private actions$: Actions,
    private domainService: DomainService
  ) {}

  getDomainsNamesWithFeedsIds$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DomainPageActions.getDomainsNamesWithFeedsIds),
      concatMap(() =>
        this.domainService.getDomainsNamesWithFeedsIds().pipe(
          map((results: DomainApiResponse) =>
            DomainApiActions.getDomainsNamesWithFeedsIdsSuccess({
              domains: results.domains,
            })
          ),
          catchError((error) =>
            of(DomainApiActions.getDomainsNamesWithFeedsIdsFailure({ error }))
          )
        )
      )
    );
  });
}
