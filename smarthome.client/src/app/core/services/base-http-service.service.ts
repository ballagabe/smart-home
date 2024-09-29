import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export abstract class BaseHttpService {

  protected baseUrl: string = environment.baseUrl;

  constructor(protected http: HttpClient) { }

  protected getBaseUrl(): string {
    return this.baseUrl;
  }

  protected get<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url, { headers: this.getHeaders() }).pipe(
      tap(data => console.log('Data fetched: ', data)),
      catchError(this.handleError)
    );
  }

  protected post<T, D>(endpoint: string, data: D): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post<T>(url, data, { headers: this.getHeaders() }).pipe(
      tap(data => console.log('Data fetched: ', data)),
      catchError(this.handleError)
    );
  }

  protected put<T, D>(endpoint: string, data: D): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.put<T>(url, data, { headers: this.getHeaders() }).pipe(
      tap(data => console.log('Data fetched: ', data)),
      catchError(this.handleError)
    );
  }

  protected delete<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete<T>(url, { headers: this.getHeaders() }).pipe(
      tap(data => console.log('Data fetched: ', data)),
      catchError(this.handleError)
    );
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
