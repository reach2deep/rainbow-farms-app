import { MasterDataProvider } from './../shared/master-data-provider';

import { TransactionService } from '../shared/transaction.service';
import { AppConfig } from '../../config/app.config';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  isNumPadVisible = false;
  url;

  @Output() transactionDetailSaved = new EventEmitter<Transaction>();
  transaction: Transaction;
  newTransactionForm: FormGroup;
  error: string;
  @ViewChild('form') myNgForm; // just to call resetForm method

  filesToUpload: Array<File> = [];

  constructor(private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private masterdataService: MasterDataProvider,
   // private location: Location,
    private activatedRoute: ActivatedRoute) {

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

    const transactionId = this.activatedRoute.snapshot.paramMap.get('id');

    if (transactionId) {
    this.transactionService.getTransactionById(transactionId).subscribe((transaction: Transaction) => {
      this.transaction = transaction;
      console.log(JSON.stringify(this.transaction));
    });
  }
  }

  createNewTransaction(newTransaction: Transaction) {

     const transDateTime = new Date(moment(this.transaction.transactionDate).format('YYYY-MM-DD ')
                                        + moment().format('HH:mm'));
     newTransaction.transactionDate = transDateTime;

     this.transactionService.uploadImage(this.filesToUpload).subscribe((uploadedImage: string) => {
      this.transaction.attachments.uniqueName = uploadedImage;
      this.transaction.attachments.name = 'this.filesToUpload.file';
      console.log(JSON.stringify(this.transaction));
    });

      this.transactionService.createTransaction(newTransaction).subscribe((newTransactionWithId) => {
      this.transactionDetailSaved.emit(newTransactionWithId);
      this.myNgForm.resetForm();
    }, (response: Response) => {
      if (response.status === 500) {
        this.error = 'errorHasOcurred';
      }
    });
  }

  toggleCategoryView() {
    this.isCategoryVisible = this.isCategoryVisible === true ? false : true;
  }

  togglePayeeView() {
    this.isPayeeVisible = this.isPayeeVisible === true ? false : true;
  }

  toggleNumberView() {
  //  this.isNumPadVisible = this.isNumPadVisible === true ? false : true;
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

  upload() {
    if (this.filesToUpload.length > 0) {
    const files: Array<File> = this.filesToUpload;
    this.transactionService.uploadImage(this.filesToUpload).subscribe((transaction: Transaction) => {
      this.transaction = transaction;
      console.log(JSON.stringify(this.transaction));
    });
  }
}

fileChangeEvent(event: any) {
  console.log('fileChangeEvent');
  const files = event.srcElement.files;
  console.log(files);
    this.filesToUpload = <Array<File>>event.target.files;

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }

    }
}

