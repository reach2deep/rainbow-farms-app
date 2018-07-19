import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './../shared/file-upload/file-upload.component';
import { CategoryComponent } from './category/category.component';
import { MockServerResultsService } from './../shared/paging/mock-server-results-service';
import { TransactionService } from './shared/transaction.service';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionsRoutingModule } from './transactions-routing.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// import {HeroRoutingModule} from './heroes-routing.module';
import {SharedModule} from '../shared/modules/shared.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { PayeeComponent } from './payee/payee.component';

// import {HeroListComponent, RemoveHeroDialogComponent} from './hero-list/hero-list.component';
// import {HeroService} from './shared/hero.service';
// import {HeroDetailComponent} from './hero-detail/hero-detail.component';
// import {HeroesComponent} from './heroes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TransactionsRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    HttpClientModule,
SlimLoadingBarModule.forRoot()
  ],
  declarations: [
    TransactionsComponent,
    TransactionListComponent,
    TransactionDetailComponent,
    CategoryComponent,
    SubCategoryComponent,
    PayeeComponent,
    FileUploadComponent
    // HeroListComponent,
    // RemoveHeroDialogComponent,
    // HeroDetailComponent
  ],
  entryComponents: [
    // RemoveHeroDialogComponent
  ],
  providers: [
    TransactionService,
    MockServerResultsService
  ]
})

export class TransactionsModule {

  constructor() {

    console.log('TransactionsModule Loaded');

  }
}
