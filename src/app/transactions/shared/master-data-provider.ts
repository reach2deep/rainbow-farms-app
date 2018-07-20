import { Category, Payee } from './transaction.model';
import { TransactionService } from './transaction.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MasterDataProvider  {

  constructor(private transactionService: TransactionService) { }

  private  categoryList: Category [];
  private  subCategoryList: Category[];
  private  payeeList: Payee[];


  public getPayees(): Payee[] {
    return this.payeeList;
}

  loadMasters(): void {

    console.log('Loading Masters...');

    this.transactionService.getAllMasters().subscribe((masters: any) => {
      this.payeeList = masters['payees'];
      this.categoryList = masters['categories'];
      console.log('Masters Loaded');

    });

  }

}
