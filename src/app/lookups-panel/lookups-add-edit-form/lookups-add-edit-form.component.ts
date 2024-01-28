import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/api/models/Category';
import { Lookup } from 'src/app/api/models/Lookup';
import { LookupService } from 'src/app/api/services/lookup.service';

@Component({
  selector: 'app-lookups-add-edit-form',
  templateUrl: './lookups-add-edit-form.component.html',
  styleUrls: ['./lookups-add-edit-form.component.css']
})
export class LookupsAddEditFormComponent {
  lookup: Lookup = {};
  @Input() id?: number;
  @Input() categoryId?: number;
  @Input() categories: Category[] =[];
  @Output() lookupEmitter: EventEmitter<Lookup> = new EventEmitter<Lookup>();
  isAdd: boolean = false;

  constructor(
    private activeModal: NgbActiveModal, private lookupService: LookupService
  ) {}

  ngOnInit() {
    if(!this.id) {
      this.isAdd = true;
      this.lookup.categoryId = this.categoryId;
    }
    else this.search();
  }
 
  search() {
    this.lookupService.searchLookupById(this.id!).subscribe(res => {
      this.lookup = res;
      console.log(this.lookup)
    })
  }

  OnSave() {
    this.lookupEmitter?.emit(this.lookup);
    this.close();
  }

  close() {
    this.activeModal.close();
  }
}
