import { TransactionService } from './../shared/transaction.service';
import { AppConfig } from './../../config/app.config';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../shared/transaction.model';
import * as moment from 'moment';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  isCategoryVisible = false;
  isPayeeVisible = false;

  @Output() transactionDetailSaved = new EventEmitter<Transaction>();
  transaction: Transaction;
  newTransactionForm: FormGroup;
  error: string;
  @ViewChild('form') myNgForm; // just to call resetForm method



  constructor(private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
  private transactionService: TransactionService) {

    this.transaction = new Transaction();
      this.newTransactionForm = this.formBuilder.group({
        'transactionType': new FormControl('', [Validators.required]),
        'transactionDate': new FormControl('', [Validators.required]),
        'category': new FormControl('', [Validators.required]),
        'account': new FormControl('', [Validators.required]),
        'payee': new FormControl('', [Validators.required]),
        'amount': new FormControl('', [Validators.required]),
        'notes': new FormControl('', ),
      });

    }

  ngOnInit() {
  }

  createNewTransaction(newTransaction: Transaction) {

     const transDateTime = new Date(moment(this.transaction.transactionDate).format('YYYY-MM-DD ')
                                        + moment().format('HH:mm'));
    // let transDateTime= moment(this.transaction.transactionDate).format('YYYY-MM-DD ')
     // + moment().format('HH:mm');
     console.log(transDateTime);
     newTransaction.transactionDate = transDateTime;

    // console.log(this.transaction.transactionDate);
    // console.log(this.transaction.transactionDate);
    console.log('newTransaction ' + JSON.stringify( newTransaction));
    this.transactionService.createTransaction(newTransaction).subscribe((newTransactionWithId) => {
      this.transactionDetailSaved.emit(newTransactionWithId);
      console.log('WITH ID' + JSON.stringify(newTransactionWithId));
      this.myNgForm.resetForm();
    }, (response: Response) => {
      if (response.status === 500) {
        this.error = 'errorHasOcurred';
      }
    });
  }

//   subcribeToFormChanges() {
//     const myFormStatusChanges$ = this.newTransactionForm.statusChanges;
//     const myFormValueChanges$ = this.newTransactionForm.valueChanges;

//     myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
//     myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
// }


  toggleCategoryView() {
    this.isCategoryVisible = this.isCategoryVisible === true ? false : true;
  }

  togglePayeeView() {
    this.isPayeeVisible = this.isPayeeVisible === true ? false : true;
  }

  onCategorySelected(category) {
    console.log('category ' + category);
    this.transaction.category = category;
    this.toggleCategoryView();
  }

  onPayeeSelected(payee) {
    console.log('payee ' + payee);
    this.transaction.payee = payee;
    this.togglePayeeView();
  }
}

