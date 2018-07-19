import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfig} from '../../config/app.config';

import {catchError, tap} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from '../../core/shared/logger.service';
import { Transaction } from './transaction.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TransactionService {
  private transactionUrl: string;
  private translations: any;


  constructor(private http: HttpClient,
              private translateService: TranslateService,
              private snackBar: MatSnackBar) {
                this.transactionUrl = AppConfig.endpoints.transactions;

    this.translateService.get(['heroCreated', 'saved', 'heroLikeMaximum', 'heroRemoved'], {
      'value': AppConfig.votesLimit
    }).subscribe((texts) => {
      this.translations = texts;
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      LoggerService.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionUrl)
      .pipe(
        tap(heroes => LoggerService.log(`fetched Transactions`)),
        catchError(this.handleError('getTransactions', []))
      );
  }

  getTransactionById(id: string): Observable<Transaction> {
    const url = `${this.transactionUrl}/${id}`;
    return this.http.get<Transaction>(url).pipe(
      tap(() => LoggerService.log(`fetched Transaction id=${id}`)),
      catchError(this.handleError<Transaction>(`getTransaction id=${id}`))
    );
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionUrl, JSON.stringify({
      transactionType: transaction.transactionType,
      transactionDate: transaction.transactionDate,
      category: transaction.category,
      subCategory: transaction.subCategory,
      account: transaction.account,
      payee: transaction.payee,
      amount: transaction.amount,
      notes: transaction.notes,
      createdAt: transaction.createdAt,
      createdBy: transaction.createdBy
    }), httpOptions).pipe(
      tap((TransactionSaved: Transaction) => {
        LoggerService.log(`added Transaction w/ id=${TransactionSaved.id}`);
        this.showSnackBar('Transaction Created');
      }),
      catchError(this.handleError<Transaction>('addTransaction'))
    );
  }


  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(this.translations[name], 'OK', config);
  }
}
