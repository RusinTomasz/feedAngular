import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

/* RxJs */
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DomainService {
  private domainsUrl = `${environment.apiHost}/domain`;

  constructor(private http: HttpClient) {}

  getDomainsNamesWithFeedsIds() {
    return this.http.get(this.domainsUrl).pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage =
      'Wystąpił błąd podczas pobierania domen, proszę spróbować ponownie.';
    if (!errorRes.error.error.message) {
      return throwError(errorMessage);
    }

    return throwError(errorMessage);
  }
}
