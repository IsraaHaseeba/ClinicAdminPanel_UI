import { Component } from '@angular/core';
import { Lookup } from '../api/models/Lookup';
import { LookupService } from '../api/services/lookup.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LookupsAddEditFormComponent } from './lookups-add-edit-form/lookups-add-edit-form.component';
import { Category } from '../api/models/Category';
import { CategoryService } from '../api/services/category.service';
import { CategoryAddEditFormComponent } from './category-add-edit-form/category-add-edit-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lookups-panel',
  templateUrl: './lookups-panel.component.html',
  styleUrls: ['./lookups-panel.component.css']
})
export class LookupsPanelComponent {
  lookups: Lookup[] = [];
  tableColumns = ['Lookup Item', 'Category', ''];
  constructor(private toastr: ToastrService, private lookupService: LookupService, private modalService: NgbModal, private categoryService: CategoryService) {}
  categories: Category[] =[];
  newCategory: Category = {};
  isAddCategory: boolean = false;
  isWarning: boolean = false;
  selectedCategory: Category =  {};
  
  ngOnInit(): void {
    this.searchCategories();
  }

  searchLookups() {
    if(this.selectedCategory)
      this.lookupService.searchLookupsByCategory(this.selectedCategory.code!).subscribe(lookups => {
        this.lookups = lookups as Lookup[] ?? [];
      })
  }

  searchCategories() {
    this.categoryService.searchAllCategories().subscribe(categories => {
      this.categories = categories as Category[];
    })
  }

  deleteCategory(ev: Event, id: number){
    ev.stopPropagation();
    this.categoryService.deleteCategory(id).subscribe(res => {
      this.searchCategories();
      this.selectedCategory = {};
    });
  }

  onLookupDelete(id: number){
    this.lookupService.deleteLookup(id).subscribe(res => {
      this.searchLookups();
    });
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

  addCategory() {
    this.categoryService.addUpdateCategory(this.newCategory).subscribe(res => {
      this.isAddCategory = false;
      this.newCategory = {};
      this.searchCategories();
      this.toastr.success('Successful!');
    },
    () => {
      this.toastr.error('Failed!');
    })
  }
  
  onEditCategory(ev: Event, category?: Category) {
    ev.stopPropagation();
    if(category) {
      const modalRef = this.modalService.open(CategoryAddEditFormComponent);
      modalRef.componentInstance.id = category.id;
      modalRef.componentInstance.categoryEmitter.subscribe((res: any) => {
        this.updateCategory(res, res?.id);
      })
    }
  } 

  updateCategory(category?: Category, id?: number) {
    if(category) {
      this.categoryService.addUpdateCategory(category, id).subscribe(res => {
            this.searchCategories();
            this.searchLookups();
            this.toastr.success('Successful!');
      },
      () => {
        this.toastr.error('Failed!');
      })
    }
  }

  onLookupAddEdit(id: number | undefined){
    const modalRef = this.modalService.open(LookupsAddEditFormComponent);
		modalRef.componentInstance.id = id;
    modalRef.componentInstance.categories = this.categories;
    modalRef.componentInstance.categoryId = this.selectedCategory.id;
    modalRef.componentInstance.lookupEmitter.subscribe((res: any) => {
      this.addUpdateLookup(res, id);
      })
  }

  onCategorySelect(category: Category) {
    this.selectedCategory = category;
  }

  addUpdateLookup(lookup: Lookup, id?: number){
    this.lookupService.addUpdateLookup(lookup, id).subscribe(res => {
      if(this.selectedCategory.id){
        this.searchLookups();
      } 
      this.toastr.success('Successful!');
    },
    () => {
      this.toastr.error('Failed!');
    });
  }
}
