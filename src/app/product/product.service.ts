import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

/* RxJs */
import { catchError, take, map, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { State } from './../state/app.state';
import { getPageSize } from './state/index';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private projectsUrl = `${environment.apiHost}/products`;
  private pageSize$ = this.store.select(getPageSize);

  constructor(private store: Store<State>, private http: HttpClient) {}

  getProducts(currentPage: Number) {
    return this.pageSize$.pipe(
      take(1),
      map((pageSize) => {
        let paramsObj = new HttpParams();
        paramsObj = paramsObj.append('page', currentPage.toString());
        paramsObj = paramsObj.append('size', pageSize.toString());

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
      'Wystąpił błąd podczas pobierania produktów, proszę spróbować ponownie.';
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
