import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/api/models/Category';
import { Lookup } from 'src/app/api/models/Lookup';

@Component({
  selector: 'app-lookups-add-edit-form',
  templateUrl: './lookups-add-edit-form.component.html',
  styleUrls: ['./lookups-add-edit-form.component.css']
})
export class LookupsAddEditFormComponent {
  @Input() lookup: Lookup = {};
  @Input() id?: number;
  @Input() categories: Category[] =[];

  @Output() lookupEmitter: EventEmitter<Lookup> = new EventEmitter<Lookup>();
  isAdd: boolean = false;

  constructor(
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    if(!this.id && JSON.stringify(this.lookup) == '{}') this.isAdd = true;
  }
 
  OnSave() {
    this.lookupEmitter?.emit(this.lookup);
    this.close();
  }

  close() {
    this.activeModal.close();
  }
}
