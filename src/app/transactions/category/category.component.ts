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


  constructor(private masterdataService: MasterDataProvider) {}

  ngOnInit() {
    console.log('categoryList ' + JSON.stringify(this.masterdataService.getCategories()));
    this.categories = this.masterdataService.getCategories();

  }

  setCategorySelected(category) {
    console.log('category ' + JSON.stringify(category));
    if (!this.isEditEnabled) {
      this.selectedCategory = category;
      this.canSelectSubCategory = true;
    } else {
      this.isEditEnabled = true;
      this.canAddEditItem = true;
      this.addEditCategoryItem = category;
    }
  }

  setSelectedSubCategory(subcategory) {
   this.canSelectSubCategory = false;
    this.selectedCategoryChange.emit(this.selectedCategory.name + '/' + subcategory.name);
  }

  addNewItem() {
    this.canAddEditItem = true;
    console.log('addNewItem');
  }
  editList() {
    this.addEditCategoryItem = this.selectedCategory;
    this.isEditEnabled = this.isEditEnabled === true ? false : true;
    console.log('edit Item' + this.addEditCategoryItem);
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
