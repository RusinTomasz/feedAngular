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
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get(`http://localhost:8080/products?page=1`)
      .pipe(catchError(this.handleError));
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
