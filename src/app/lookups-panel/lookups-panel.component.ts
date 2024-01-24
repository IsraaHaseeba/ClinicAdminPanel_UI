import { Component } from '@angular/core';
import { Lookup } from '../api/models/Lookup';
import { LookupService } from '../api/services/lookup.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LookupsAddEditFormComponent } from './lookups-add-edit-form/lookups-add-edit-form.component';
import { Category } from '../api/models/Category';
import { CategoryService } from '../api/services/category.service';
import { CategoryAddEditFormComponent } from './category-add-edit-form/category-add-edit-form.component';

@Component({
  selector: 'app-lookups-panel',
  templateUrl: './lookups-panel.component.html',
  styleUrls: ['./lookups-panel.component.css']
})
export class LookupsPanelComponent {
  lookups: Lookup[] = [];
  tableColumns = ['Lookup Item', 'Category', ''];
  constructor(private lookupService: LookupService, private modalService: NgbModal, private categoryService: CategoryService) {}
  categories: Category[] =[];
  newCategory: Category = {};
  isAddCategory: boolean = false;
  isWarning: boolean = false;

  ngOnInit(): void {
    this.getLookups();
    this.getCategories();
  }

  getLookups() {
    this.lookupService.getAllLookups().subscribe(lookups => {
      this.lookups = lookups as Lookup[] ?? [];
    })
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories as Category[];
    })
  }

  deleteCategory(category: Category) {
    category.isDeleted = true;
    this.categoryService.addUpdateCategory(category, category.id).subscribe(res => {
      this.getCategories();
    });
  }

  addCategory() {
    this.categoryService.addUpdateCategory(this.newCategory).subscribe(res => {
      this.isAddCategory = false;
      this.newCategory = {};
      this.getCategories();
    })
  }

  onLookupDelete(id: number, lookup: Lookup){
    lookup.isDeleted = true;
    this.addUpdateLookup(lookup, id);
  }

  checkIfCategoryExist(){
    if(this.newCategory.code) {
      this.categoryService.checkIfCodeExist(this.newCategory.code).subscribe(isExisting => {
            if(isExisting == false){
              this.addCategory();
              this.isWarning = false;
            }
            else this.isWarning = true;
          })
    }
    else this.isWarning = true;
  }

  onEditCategory(category?: Category) {
    if(category) {
      const modalRef = this.modalService.open(CategoryAddEditFormComponent);
      modalRef.componentInstance.id = category.id;
      modalRef.componentInstance.category = {...category};
      modalRef.componentInstance.categoryEmitter.subscribe((res: any) => {
        this.updateCategory(res, res?.id);
      })
    }
  } 

  updateCategory(category?: Category, id?: number) {
    if(category) {
      this.categoryService.addUpdateCategory(category, id).subscribe((res => {
            this.getCategories();
            this.getLookups();
      }))
    }
  }

  onLookupEdit(id: number, lookup: Lookup){
    const modalRef = this.modalService.open(LookupsAddEditFormComponent);
		modalRef.componentInstance.id = id;
		modalRef.componentInstance.lookup = {...lookup};
    modalRef.componentInstance.categories = this.categories;
    modalRef.componentInstance.lookupEmitter.subscribe((res: any) => {
      this.addUpdateLookup(res, res.id);
      })
  }

  onLookupAdd() {
    const modalRef = this.modalService.open(LookupsAddEditFormComponent);
    modalRef.componentInstance.categories = this.categories;
    modalRef.componentInstance.lookupEmitter.subscribe((res: any) => {
      this.addUpdateLookup(res, undefined);
      })
  }

  addUpdateLookup(lookup: Lookup, id?: number){
    this.lookupService.addUpdateLookup(lookup, id).subscribe(res => {
      this.getLookups();
    });
  }
}
