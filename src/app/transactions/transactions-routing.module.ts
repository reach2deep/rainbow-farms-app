import { TransactionsModule } from './transactions.module';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { CategoryComponent } from './category/category.component';

import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { TransactionsComponent } from './transactions.component';

// import {HeroListComponent} from './hero-list/hero-list.component';
// import {HeroDetailComponent} from './hero-detail/hero-detail.component';
// import {HeroesComponent} from './heroes.component';

const transactionsRoutes: Routes = [

  {path: '', component: TransactionListComponent},
  {path: 'new', component: TransactionDetailComponent},
  {path: ':id', component: TransactionDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(transactionsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class TransactionsRoutingModule {

  constructor() {

    console.log('TransactionsRoutingModule Loaded');

  }
}
