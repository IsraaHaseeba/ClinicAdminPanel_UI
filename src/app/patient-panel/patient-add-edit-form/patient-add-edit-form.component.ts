import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Patient } from 'src/app/api/models/Patient';

@Component({
  selector: 'app-patient-add-edit-form',
  templateUrl: './patient-add-edit-form.component.html',
  styleUrls: ['./patient-add-edit-form.component.css']
})
export class PatientAddEditFormComponent {
  @Input() patient: Patient = {};
  @Input() id?: number;
  @Output() patientEmitter: EventEmitter<Patient> = new EventEmitter<Patient>();
  isAdd: boolean = false;

  constructor(
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    if(!this.id && JSON.stringify(this.patient) == '{}') this.isAdd = true;
  }
 
  OnSave() {
    this.patientEmitter?.emit(this.patient);
    this.close();
  }

  onIdChange(ev: any) {
    this.patient.identityNumber = ev.target.value;
  }

  close() {
    this.activeModal.close();
  }
}
