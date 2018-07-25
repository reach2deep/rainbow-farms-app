import { inject } from '@angular/core/testing';
import { PagedData } from './../../shared/paging/paged-data';
import { Page } from './../../shared/paging/page';
import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfig} from '../../config/app.config';

import {catchError, tap} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from '../../core/shared/logger.service';
import { Transaction, Category, Payee } from './transaction.model';

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

  uploadImage(filesToUpload: any): Observable<any> {

    const files: Array<File> = filesToUpload;
    console.log(files);
    const formData: any = new FormData();
    for (let i = 0; i < files.length; i++) {
       formData.append('uploads[]', files[i], files[i]['name']);
    }

    return this.http.post(AppConfig.endpoints.fileupload, formData)
        .pipe(
          tap(response => LoggerService.log('updated')),
          catchError(this.handleError('uploadImage', []))
        );
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
      attachments: transaction.attachments,
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

  getAllMasters(): Observable<any> {
    return this.http.get<Transaction[]>(AppConfig.endpoints.masters)
      .pipe(
        tap(heroes => LoggerService.log(`fetched masters`)),
        catchError(this.handleError('getAllMasters', []))
      );
  }

  createCategory(newCategory: Category): Observable<Category> {
    return this.http.post<Category>(AppConfig.endpoints.category, JSON.stringify({
            name: newCategory.name,
            parent: newCategory.parent,
            type: newCategory.type,
    }), httpOptions).pipe(
      tap((CategorySaved: Category) => {
        LoggerService.log(`added Category w/ id=${CategorySaved.id}`);
        this.showSnackBar('Category Created');
      }),
      catchError(this.handleError<Category>('createCategory'))
    );
  }

  updateCategoryById(updateCategory: Category): Observable<Category> {
    console.log('updateCategoryById' +   JSON.stringify(updateCategory['_id']));
    const url = `${AppConfig.endpoints.category}/${updateCategory['_id']}`;

    return this.http.put<Category>(url, JSON.stringify({
            name: updateCategory.name,
            parent: updateCategory.parent,
            type: updateCategory.type,
        }), httpOptions).pipe(
        tap((CategorySaved: Category) => {
          LoggerService.log(`updated Category w/ id=${CategorySaved}`);
          this.showSnackBar('Category update');
        }),
        catchError(this.handleError<Category>('updateCategoryById'))
        );
  }

  deleteCategoryById(id: any): Observable<Category> {
    const url = `${AppConfig.endpoints.category}/${id}`;

    return this.http.delete<Category>(url, httpOptions).pipe(
      tap(() => LoggerService.log(`deleted Category id=${id}`)),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }


  createPayee(newPayee: Payee): Observable<Payee> {
    return this.http.post<Payee>(AppConfig.endpoints.payee, JSON.stringify({
            name: newPayee.name,
            address: newPayee.address,
            mobile: newPayee.mobile,
            notes: newPayee.notes
    }), httpOptions).pipe(
      tap((PayeeSaved: Payee) => {
        LoggerService.log(`added Category w/ id=${PayeeSaved.id}`);
        this.showSnackBar('Paye Created');
      }),
      catchError(this.handleError<Payee>('createPayee'))
    );
  }

  updatePayeeById(updatePayee: Payee): Observable<Payee> {
    console.log('updateCategoryById' +   JSON.stringify(updatePayee['_id']));
    const url = `${AppConfig.endpoints.payee}/${updatePayee['_id']}`;

    return this.http.put<Payee>(url, JSON.stringify({
            name: updatePayee.name,
            address: updatePayee.address,
            mobile: updatePayee.mobile,
            notes: updatePayee.notes
        }), httpOptions).pipe(
        tap((PayeeSaved: Payee) => {
          LoggerService.log(`updated Payee w/ id=${PayeeSaved}`);
          this.showSnackBar('Payee update');
        }),
        catchError(this.handleError<Payee>('updatePayeeById'))
        );
  }

  deletePayeeById(id: any): Observable<Payee> {
    const url = `${AppConfig.endpoints.payee}/${id}`;

    return this.http.delete<Payee>(url, httpOptions).pipe(
      tap(() => LoggerService.log(`deleted Payee id=${id}`)),
      catchError(this.handleError<Payee>('deletePayeeById'))
    );
  }


}
