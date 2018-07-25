import { MatDialog } from '@angular/material';
import { MockServerResultsService } from '../../shared/paging/mock-server-results-service';
import { CorporateEmployee } from '../../shared/paging/corporate-employee';
import { Page } from '../../shared/paging/page';
import { AppConfig } from '../../config/app.config';
import { Router } from '@angular/router';
import { TransactionService } from '../shared/transaction.service';
import { Transaction } from '../shared/transaction.model';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionListComponent implements OnInit {

   transactions: Transaction[];

  //  filterString = 'Expense';
  //  page = new Page();
  //  rows = new Array<Transaction>();

constructor(private transactionService: TransactionService,
            private router: Router,
            public dialog: MatDialog) {
              // this.page.pageNumber = 0;
              // this.page.size = 20;
}

  ngOnInit() {
  //  this.setPage({ offset: 0 });
    this.transactionService.getTransactions().subscribe((transactions: Array<Transaction>) => {
      this.transactions = transactions;
    });
  }

  createNewItem(item) {
    console.log('createNewItem ' + item);
    if (item) {
      console.log('routing');
      this.router.navigate([AppConfig.routes.transactions + '/new'], { queryParams: { transactionType: item } });
    }
  }

  // createNewItem(item): void {
  //   const dialogRef = this.dialog.open(TransactionDetailComponent, {
  //    // width: '250px',
  //     data: {transactionType: item}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }

  // setPage(pageInfo) {
  //   this.page.pageNumber = pageInfo.offset;
  //   this.transactionService.getTransactions(this.page).subscribe(pagedData => {
  //     this.page = pagedData.page;
  //     this.rows = pagedData.data;
  //   });
  // }

  viewDetail(id): void {
    console.log(id);
    if (id) {
      console.log('routing ' + [AppConfig.routes.transactions + '/' + id]);
      this.router.navigate([AppConfig.routes.transactions + '/' + id]);
    }
  }
// }
}


