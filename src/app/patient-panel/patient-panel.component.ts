import { Component } from '@angular/core';
import { Patient } from '../api/models/Patient';
import { PatientService } from '../api/services/patient.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientAddEditFormComponent } from './patient-add-edit-form/patient-add-edit-form.component';

@Component({
  selector: 'app-patient-panel',
  templateUrl: './patient-panel.component.html',
  styleUrls: ['./patient-panel.component.css']
})
export class PatientPanelComponent {
  patients: Patient[] = [];
  tableColumns = ['Identity Number', 'Name', 'Birth Date', 'Address', ''];
  constructor(private patientService: PatientService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.patientService.searchAllPatients().subscribe(patients => {
      this.patients = patients as Patient[] ?? [];
    })
  }

  onDelete(id: number){
    this.patientService.deletePatient(id).subscribe(res => {
      this.search();
    });
  }
  
  onAddEdit(id: number | undefined){
    const modalRef = this.modalService.open(PatientAddEditFormComponent);
		modalRef.componentInstance.id = id;
    modalRef.componentInstance.patientEmitter.subscribe((res: any) => {
      this.addUpdate(res, id);
      })
  }

  addUpdate(patient: Patient, id?: number){
    this.patientService.addUpdatePatient(patient, id).subscribe(res => {
      this.search();
    });
  }
  
}
