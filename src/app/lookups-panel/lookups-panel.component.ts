import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Lookup } from '../api/models/Lookup';
import { LookupService } from '../api/services/lookup.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../api/models/Category';
import { CategoryService } from '../api/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';

export enum ModalEntities {Lookup, Category}

@Component({
  selector: 'app-lookups-panel',
  templateUrl: './lookups-panel.component.html',
  styleUrls: ['./lookups-panel.component.css'],
})

export class LookupsPanelComponent {
  tableColumns = ['Lookup Item', 'Category', ''];
  lookups: Lookup[] = [];
  categories: Category[] = [];
  selectedCategory: Category = {};
  lookup: Lookup = {};
  category: Category = {};
  lookupId?: number;
  categoryId?: number;
  isAdd: boolean = false;
  isWarning: boolean = false;
  searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filteredData = this.searchText.pipe(
    map((searchText) => {
      if (!searchText || !searchText.length) {
        return this.lookups;
      }
      return this.lookups.filter(
        (d) =>
          d.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          d.categoryName?.toLowerCase().includes(searchText.toLowerCase())
      );
    })
  );
  
  @ViewChild('lookupsModal', { read: TemplateRef, static: true })
  lookupsModal?: TemplateRef<any>;
  @ViewChild('categoriesModal', { read: TemplateRef, static: true })
  categoryModal?: TemplateRef<any>;

  modalRef?: any;
  modalEntities = ModalEntities;

  constructor(
    private toastr: ToastrService,
    private lookupService: LookupService,
    private modalService: NgbModal,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.searchCategories();
  }

  searchLookups() {
    if (this.selectedCategory)
      this.lookupService
        .searchLookupsByCategory(this.selectedCategory.code!)
        .subscribe((lookups) => {
          this.lookups = (lookups as Lookup[]) ?? [];
          this.searchText.next('');
        });
  }

  searchCategories() {
    this.categoryService.searchAllCategories().subscribe((categories) => {
      this.categories = categories as Category[];
    });
  }

  onFilter(ev: any) {
    this.searchText.next(ev.target.value);
  }

  searchCategory(id: number) {
    this.categoryService.searchCategoryById(id).subscribe(res => {
      this.category = res;
    })
  }

  searchLookup(id: number) {
    this.lookupService.searchLookupById(id).subscribe((res) => {
      this.lookup = res;
    });
  }

  initializeModal(entity: number, id: number | undefined) {
    if (!id) {
      this.isAdd = true;
      if (entity == ModalEntities.Lookup)
        this.lookup.categoryId = this.selectedCategory.id;
    } else {
      if (entity == ModalEntities.Lookup) this.searchLookup(id);
      else if (entity == ModalEntities.Category) this.searchCategory(id);
    }
  }

  onSave(entity: number) {
    if (entity == ModalEntities.Lookup) {
      this.addUpdate(entity, this.lookup, this.lookupId);
      this.close();
    }
    else if (entity == ModalEntities.Category) {
      if(this.category.code) {
          this.categoryService.checkIfCodeExist(this.category.code, this.categoryId).subscribe(res => {
            if(res == true){
              this.isWarning = true;
            }
            else {
              if(confirm("Are you sure you want to save changes?")){
                this.addUpdate(entity, this.category, this.categoryId);
              }
              this.isWarning = false;
              this.close();
            }
          });
        }
        else this.isWarning = false;
      }
  }

  close() {
    this.category = {};
    this.categoryId = 0;
    this.lookup = {};
    this.lookupId = 0;
    this.modalRef.close();
  }

  onDelete(entity: number, id: number, ev?: Event) {
    if(ev) ev.stopPropagation();
    if (entity == ModalEntities.Lookup) {
      this.lookupService.deleteLookup(id).subscribe((res) => {
      this.searchLookups();
      });
    }
    else if (entity == ModalEntities.Category) {
      this.categoryService.deleteCategory(id).subscribe((res) => {
          this.searchCategories();
          this.selectedCategory = {};
        });
    }
  }

  onAddEdit(entity: number, id: number | undefined, event?: any) {
    if (entity == ModalEntities.Lookup) {
      this.modalRef = this.modalService.open(this.lookupsModal);
      this.lookupId = id;
    }
    else if (entity == ModalEntities.Category) {
      if(event) event.stopPropagation();
      this.modalRef = this.modalService.open(this.categoryModal);
      this.categoryId = id;
    }
    this.initializeModal(entity, id);
  }

  onCategorySelect(category: Category) {
    this.selectedCategory = category;
  }

  addUpdate(entity: number, object: any, id?: number) {
    if (entity == ModalEntities.Lookup) {
      this.lookupService.addUpdateLookup(object, id).subscribe(
        (res) => {
          if (this.selectedCategory.id) {
            this.searchLookups();
          }
          this.toastr.success('Successful!');
        },
        () => {
          this.toastr.error('Failed!');
        }
      );
    }

    else if(entity == ModalEntities.Category) {
      this.categoryService.addUpdateCategory(object, id).subscribe(
        (res) => {
          this.searchCategories();
          this.searchLookups();
          this.toastr.success('Successful!');
        },
        () => {
          this.toastr.error('Failed!');
        }
      );
    }
  }
}
