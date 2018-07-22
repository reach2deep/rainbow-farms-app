import { MockServerResultsService } from '../../shared/paging/mock-server-results-service';
import { CorporateEmployee } from '../../shared/paging/corporate-employee';
import { Page } from '../../shared/paging/page';
import { AppConfig } from '../../config/app.config';
import { Router } from '@angular/router';
import { TransactionService } from '../shared/transaction.service';
import { Transaction } from '../shared/transaction.model';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';

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
            private router: Router) {
              // this.page.pageNumber = 0;
              // this.page.size = 20;
}

  ngOnInit() {
  //  this.setPage({ offset: 0 });
    this.transactionService.getTransactions().subscribe((transactions: Array<Transaction>) => {
      this.transactions = transactions;
    });
  }

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


