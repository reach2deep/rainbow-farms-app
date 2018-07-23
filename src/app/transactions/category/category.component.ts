import { Observable } from 'rxjs';
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

    this.transactionService.getAllMasters().subscribe((masters: any) => {
      // this.payeeList = masters['payees'];
      this.categories = masters['categories'];
      console.log('Masters Loaded ' +   JSON.stringify(masters));
    });

    // console.log('categoryList ' + JSON.stringify(this.masterdataService.getCategories()));
    // this.categories = this.masterdataService.getCategories();

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
      });
    } else {
      console.log('UPDATE Item ' + JSON.stringify(this.addEditCategoryItem));
      this.transactionService.updateCategoryById(this.addEditCategoryItem).subscribe((response: any) => {
        console.log('Categry Updated' +   JSON.stringify(response));
      });
    }
    this.isEditEnabled = false;
    this.canAddEditItem = false;
    console.log('saveNewItem');
  }

  deleteItem(category) {
  
      console.log('SAVE AS NEW ' + JSON.stringify(this.addEditCategoryItem));
      this.transactionService.deleteCategoryById(category['_id']).subscribe((response: any) => {
        console.log('Categry deleted' +   JSON.stringify(response));
        this.categories.push(response);
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

  // addElementToObservableArray(item) {
  //   this.array$.pipe(take(1)).subscribe(val => {
  //     console.log(val)
  //     const newArr = [...val, item];
  //     this.obsArray.next(newArr);
  //   })
  // }

}
