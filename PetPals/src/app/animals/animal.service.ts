import { Injectable } from "@angular/core";
import { IAnimal } from "./animal";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'  // ROOT: AVAILABLE EVERYWHERE 
})
export class AnimalService {
    private baseUrl: string = 'https://localhost:7133'
    
    constructor(private http: HttpClient) {}

    // RETURNS AN OBSERVABLE THAT EMITS AN ARRAY OF IANIMAL
    // TAP READS THE STREAM WITHOUT CHANGING ANYTHING (errorhandling, log to console)
    // CATCHERROR TAKES AN ERRORHANDLINGMETHOD AS PARAM
    getAnimals(): Observable<IAnimal[]> {
        return this.http.get<IAnimal[]>(this.baseUrl + '/animal/list').pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError )
        );
    }

    getAnimal(id : number): Observable<IAnimal> {
      return this.http.get<IAnimal>(this.baseUrl + `/animal/${id}`).pipe(
          tap(data => console.log('All: ', JSON.stringify(data))),
          catchError(this.handleError )
      );
  }

    private handleError(err: HttpErrorResponse): Observable<never> {
        
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage); 
        return throwError(() => errorMessage);
      }

}