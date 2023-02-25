import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Table, Tables } from '@daniel/common-types'


@Injectable({ providedIn: 'root' })
export class TableService {
  // TODO:: Set URL by ENV
  private apiUrl = 'http://0.0.0.0:8080/api/tables';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET tablees from the server */
  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched tables')),
        catchError(this.handleError<Table[]>('getTables', []))
      );
  }

  /** GET table by id. Return `undefined` when id not found */
  getTableNo404<Data>(id: number): Observable<Table> {
    const url = `${this.apiUrl}/?id=${id}`;
    return this.http.get<Table[]>(url)
      .pipe(
        map(tables => tables[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} table id=${id}`);
        }),
        catchError(this.handleError<Table>(`getTable id=${id}`))
      );
  }

  /** GET table by id. Will 404 if id not found */
  getTable(id: string): Observable<Tables> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Tables>(url).pipe(
      tap(_ => this.log(`fetched table id=${id}`)),
      catchError(this.handleError<Tables>(`getTable id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new table to the server */
  addTable(table: Table): Observable<Table> {
    return this.http.post<Table>(this.apiUrl, table, this.httpOptions).pipe(
      tap((newTable: Table) => this.log(`added table w/ id=${newTable.id}`)),
      catchError(this.handleError<Table>('addTable'))
    );
  }

  /** DELETE: delete the table from the server */
  deleteTable(id: number): Observable<Table> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<Table>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted table id=${id}`)),
      catchError(this.handleError<Table>('deleteTable'))
    );
  }

  /** PUT: update the table on the server */
  updateTable(table: Table): Observable<any> {
    return this.http.put(this.apiUrl, table, this.httpOptions).pipe(
      tap(_ => this.log(`updated Table id=${table.id}`)),
      catchError(this.handleError<any>('updateTable'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a tableService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TableService: ${message}`);
  }
}
