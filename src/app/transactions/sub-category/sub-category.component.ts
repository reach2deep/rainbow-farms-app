import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  @Output() selectedSubcategory = new EventEmitter<string>();

  subCategories: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  canAddEditItem = false;
  isEditEnabled = false;
  selectedSubCategory: string;
  addEditSubCategoryItem: string;


  constructor() { }

  ngOnInit() {
  }

  setSubCategorySelected(subcategory) {
      if (!this.isEditEnabled) {
        this.selectedSubcategory.emit(subcategory);
      } else {
        this.isEditEnabled = true;
        this.canAddEditItem = true;
        this.addEditSubCategoryItem = subcategory;
      }
   }

   addNewItem() {
    this.canAddEditItem = true;
    console.log('addNewItem');
  }
  editList() {
    this.addEditSubCategoryItem = this.selectedSubCategory;
    this.isEditEnabled = this.isEditEnabled === true ? false : true;
    console.log('edit Item' + this.addEditSubCategoryItem);
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
