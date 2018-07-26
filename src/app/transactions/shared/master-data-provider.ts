import { Category, Payee } from './transaction.model';
import { TransactionService } from './transaction.service';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class MasterDataProvider  {

  constructor(private transactionService: TransactionService) { }

  private  categoryList: Category [];
  private  subCategoryList: Category[];
  private  payeeList: Payee[];


  public getPayees(): Payee[] {
    if (this.payeeList.length === 0) {
      this.loadMasters();
      return this.payeeList;
    } else {
    return this.payeeList;
    }
}

public getSubCategories(): Category[] {
  if (this.subCategoryList.length === 0) {
    this.loadMasters();
   // this.subCategoryList = _.reject(this.subCategoryList, { 'parent': ''});
    return this.subCategoryList;
  } else {
   //  this.subCategoryList = _.reject(this.subCategoryList, { 'parent': ''});
  return this.subCategoryList;
  }
}

public getCategories(): Category[] {
  if (this.categoryList.length === 0) {
    this.loadMasters();
   // this.categoryList = _.filter(this.categoryList, { 'parent': ''});
    return this.categoryList;

  } else {
   // this.categoryList = _.filter(this.categoryList, { 'parent': ''});
  return this.categoryList;
  }
}

  loadMasters(): void {

    console.log('Loading Masters...');

    this.transactionService.getAllMasters().subscribe((masters: any) => {
      this.payeeList = masters['payees'];
      this.categoryList = masters['categories'];
      this.subCategoryList =  masters['categories'];
      this.categoryList = _.filter(this.categoryList, { 'parent': ''});
      this.subCategoryList = _.reject(this.subCategoryList, { 'parent': ''});
     // console.log('Master SUB ' + console.log(this.subCategoryList));
      //console.log('Masters Loaded');

    });

  }

}
