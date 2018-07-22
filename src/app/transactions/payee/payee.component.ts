import { Payee } from './../shared/transaction.model';
import { MasterDataProvider } from './../shared/master-data-provider';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-payee',
  templateUrl: './payee.component.html',
  styleUrls: ['./payee.component.css']
})
export class PayeeComponent implements OnInit {

  @Output() selectedPayeeChange = new EventEmitter<string>();

  payees: Payee[] ; // = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  selectedPayee: Payee;
  canAddEditItem = false;
  isEditEnabled = false;
  addEditPayeeItem: string;

  constructor(private masterdataService: MasterDataProvider) {}

  ngOnInit() {
  //  console.log('categoryList ' + JSON.stringify(this.masterdataService.getCategories()));
    this.payees = this.masterdataService.getPayees();

  }

   setSelectedPayee(payee) {
    if (!this.isEditEnabled) {
    this.selectedPayee = payee;
     this.selectedPayeeChange.emit(this.selectedPayee.name);
    } else {
      this.isEditEnabled = true;
      this.canAddEditItem = true;
      this.addEditPayeeItem = payee;
    }
   }


   addNewItem() {
    this.canAddEditItem = true;
    console.log('addNewItem');
  }
  editList() {
    this.addEditPayeeItem = this.addEditPayeeItem;
    this.isEditEnabled = this.isEditEnabled === true ? false : true;
    console.log('edit Item' + this.addEditPayeeItem);
  }

  cancelAddEditItem() {
    this.isEditEnabled = false;
    this.canAddEditItem = false;
  }
  saveItem() {
    this.isEditEnabled = false;
    this.canAddEditItem = false;
    console.log('saveNewItem');
  }

}
