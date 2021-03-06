import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { TransactionService } from './../shared/transaction.service';
import { Category } from './../shared/transaction.model';
import { MasterDataProvider } from './../shared/master-data-provider';
import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Output() selectedCategoryChange = new EventEmitter < string > ();

  categories: Category[] ; // = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  canSelectSubCategory = false;
  canAddEditItem = false;
  isEditEnabled = false;
  selectedCategory: Category;
  addEditCategoryItem: Category;


  constructor(private masterdataService: MasterDataProvider,
   private transactionService: TransactionService
  ) {  }

  ngOnInit() {

    // this.transactionService.getAllMasters().subscribe((masters: any) => {
    //   // this.payeeList = masters['payees'];
    //   this.categories = masters['categories'];
    //   this.categories = _.filter(this.categories, { 'parent': ''});
    //   console.log('Masters Loaded ' +   JSON.stringify(this.categories));
    // });


    this.categories = this.masterdataService.getCategories();
    console.log('masterdataService categoryList ' + JSON.stringify(this.categories));
  }

  setCategorySelected(category) {
    console.log('Selected category ' + JSON.stringify(category));
    if (!this.isEditEnabled) {
      this.selectedCategory = category;
      this.canSelectSubCategory = true;
    } else {
      this.isEditEnabled = true;
      this.canAddEditItem = true;
      this.editItem(category);
    }
  }

  setSelectedSubCategory(subcategory) {
    this.canSelectSubCategory = false;
   this.selectedCategoryChange.emit(this.selectedCategory.name + '/' + subcategory.name);
  }

  editList() {
    // this.addEditCategoryItem = this.selectedCategory;
    this.isEditEnabled = this.isEditEnabled === true ? false : true;
    console.log('editList');
  }

  addNewItem() {
    this.addEditCategoryItem = new Category('0', '', '', '');
    this.canAddEditItem = true;
    console.log('addNewItem');
  }

  editItem(category) {
    console.log('editItem category' + JSON.stringify(category));
    this.addEditCategoryItem = category;
    console.log('editItem ' + JSON.stringify(this.addEditCategoryItem));
  }

  saveItem() {
    if (this.addEditCategoryItem.id === '0') {
      console.log('SAVE AS NEW ' + JSON.stringify(this.addEditCategoryItem));
      this.transactionService.createCategory(this.addEditCategoryItem).subscribe((response: any) => {
        console.log('Categry Created' +   JSON.stringify(response));
        this.categories.push(response);
        this.masterdataService.loadMasters();
      });
    } else {
      console.log('UPDATE Item ' + JSON.stringify(this.addEditCategoryItem));
      this.transactionService.updateCategoryById(this.addEditCategoryItem).subscribe((response: any) => {
        console.log('Categry Updated' +   JSON.stringify(response));
        this.masterdataService.loadMasters();
      });
    }
    
    this.isEditEnabled = false;
    this.canAddEditItem = false;
    console.log('saveNewItem');
  }

  deleteItem(e: Event, category) {

    e.preventDefault();
    e.stopImmediatePropagation();
    const index: number = this.categories.indexOf(category);
      console.log('SAVE AS NEW ' + JSON.stringify(this.addEditCategoryItem));
      this.transactionService.deleteCategoryById(category['_id']).subscribe((response: any) => {
        console.log('Categry deleted' +   JSON.stringify(response));
        // this.categories.splice(category);

      if (index !== -1) {
          this.categories.splice(index, 1);
      }
      });

    this.isEditEnabled = false;
    this.canAddEditItem = false;
    console.log('saveNewItem');
  }
  cancelAddEditItem() {
    this.isEditEnabled = false;
    this.canAddEditItem = false;
    console.log('cancelAddEditItem');
  }


}
