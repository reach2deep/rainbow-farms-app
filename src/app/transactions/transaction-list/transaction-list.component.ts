import { MockServerResultsService } from './../../shared/paging/mock-server-results-service';
import { CorporateEmployee } from './../../shared/paging/corporate-employee';
import { Page } from './../../shared/paging/page';
import { AppConfig } from './../../config/app.config';
import { Router } from '@angular/router';
import { TransactionService } from './../shared/transaction.service';
import { Transaction } from './../shared/transaction.model';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionListComponent implements OnInit, AfterViewInit {

   transactions: Transaction[];

//   constructor(private transactionService: TransactionService,
//     private router: Router) {

//   }

constructor(private serverResultsService: MockServerResultsService,
            private transactionService: TransactionService) {
  this.setPage({offset: 0, pageSize: 10});
}

  ngOnInit() {
    this.transactionService.getTransactions().subscribe((heroes: Array<Transaction>) => {
      this.transactions = heroes;
    });
  }

//   viewDetail(id): void {
//     console.log(id);
//     if (id) {
//       console.log('routing' + [AppConfig.routes.transaction + '/' + id]);
//       this.router.navigate([AppConfig.routes.transaction + '/' + id]);
//     }
//   }
// }


  page = new Page();
  rows = new Array<CorporateEmployee>();
  cache: any = {};

  @ViewChild('myTable') table;

  private isLoading: boolean = false;

 

  ngAfterViewInit() {
    this.table.bodyComponent.updatePage = function(direction: string): void {
      let offset = this.indexes.first / this.pageSize;

      if (direction === 'up') {
        offset = Math.ceil(offset);
      } else if (direction === 'down') {
        offset = Math.floor(offset);
      }

      if (direction !== undefined && !isNaN(offset)) {
        this.page.emit({ offset });
      }
    }
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo) {
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = pageInfo.pageSize;

    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;

      let rows = this.rows;
      if (rows.length !== pagedData.page.totalElements) {
        rows = Array.apply(null, Array(pagedData.page.totalElements));
        rows = rows.map((x, i) => this.rows[i]);
      }

      // calc start
      const start = this.page.pageNumber * this.page.size;

      // set rows to our new rows
      pagedData.data.map((x, i) => rows[i + start] = x);
      this.rows = rows;
      this.isLoading = false;
    });
  }

  updateTable($event){

    console.log(JSON.stringify($event));
    
  }

}


