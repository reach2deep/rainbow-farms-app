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
  {path: 'detail', component: TransactionDetailComponent},
  {path: 'cat', component: CategoryComponent},
  {path: ':id', component: TransactionDetailComponent,
  // children: [
  //   {
  //       path: 'category',
  //       component: CategoryComponent
  //   },
  //   {
  //       path: 'sub-category',
  //       component: SubCategoryComponent
     },
// ]},
  {path: 'category', component: CategoryComponent},
  {path: 'sub-category', component: SubCategoryComponent},

  // {
  //    path: '',
  //   component: TransactionListComponent,
  //  children: [
  //     {path: 'list', component: TransactionListComponent},
  //     {path: ':id', component: TransactionDetailComponent},
  //     {path: 'category', component: TransactionsComponent },
  //     {path: 'sub-category', component: SubCategoryComponent}
  //   ]
  // }
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
