import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/api/models/Category';
import { CategoryService } from 'src/app/api/services/category.service';

@Component({
  selector: 'app-category-add-edit-form',
  templateUrl: './category-add-edit-form.component.html',
  styleUrls: ['./category-add-edit-form.component.css']
})
export class CategoryAddEditFormComponent {
  category: Category = {};
  @Input() id?: number;
  @Output() categoryEmitter: EventEmitter<Category> = new EventEmitter<Category>();
  isAdd: boolean = false;
  isWarning: boolean = false;

  constructor(
    private activeModal: NgbActiveModal, private categoryService: CategoryService
  ) {}

  ngOnInit() {
    if(!this.id) {
      this.isAdd = true;
    }
    else this.search();
  }

  search() {
    this.categoryService.searchCategoryById(this.id!).subscribe(res => {
      this.category = res;
    })
  }
 
  checkIfCategoryExist(){
    if(this.category.code) {
      this.categoryService.checkIfCodeExist(this.category.code, this.category.id).subscribe(isExisting => {
            if(isExisting == false){
              this.categoryEmitter?.emit(this.category);
              this.isWarning = false;
              this.close();
            }
            else this.isWarning = true;
          })
    }
    else this.isWarning = true;
  }

  OnSave() {
    this.checkIfCategoryExist();
  }

  close() {
    this.activeModal.close();
  }
}
