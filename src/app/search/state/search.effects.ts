import { Injectable } from '@angular/core';

/* Services */

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
    // private searchService: SearchService
  ) {}
}
