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
  private projectsUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  getProducts(pageNumber: Number) {
    const pageSize = 16;

    let url = this.projectsUrl + '?page=' + pageNumber + '&size=' + pageSize;

    return this.http.get(url).pipe(catchError(this.handleError));
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
