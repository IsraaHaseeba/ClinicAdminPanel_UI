import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Patient } from 'src/app/api/models/Patient';
import { PatientService } from 'src/app/api/services/patient.service';

@Component({
  selector: 'app-patient-add-edit-form',
  templateUrl: './patient-add-edit-form.component.html',
  styleUrls: ['./patient-add-edit-form.component.css']
})
export class PatientAddEditFormComponent {
  patient: Patient = {};
  @Input() id?: number;
  @Output() patientEmitter: EventEmitter<Patient> = new EventEmitter<Patient>();
  isAdd: boolean = false;

  constructor(
    private activeModal: NgbActiveModal, private patientService: PatientService
  ) {}

  ngOnInit() {
    if(!this.id) this.isAdd = true;
    else this.search();
  }
 
  search() {
    this.patientService.searchPatientById(this.id!).subscribe(res => {
      this.patient = res;
    })
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
