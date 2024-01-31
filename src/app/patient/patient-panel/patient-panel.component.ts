import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Patient } from '../../api/models/Patient';
import { PatientService } from '../../api/services/patient.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient-panel',
  templateUrl: './patient-panel.component.html',
  styleUrls: ['./patient-panel.component.css']
})
export class PatientPanelComponent {
  patients: Patient[] = [];
  tableColumns = ['Identity Number', 'Name', 'Birth Date', 'Address', ''];
  searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');
  patient: Patient = {};
  id?: number;
  isAdd: boolean = false;
  filteredData = this.searchText.pipe(
    map(searchText => {
      if(!searchText || !searchText.length) {
        return this.patients;
      }
      return this.patients.filter(d => d.name?.toLowerCase().includes(searchText.toLowerCase()) || d.identityNumber?.toLowerCase().includes(searchText.toLowerCase()) || d.address?.toLowerCase().includes(searchText.toLowerCase()));
    })
  );
  @ViewChild('modal', { read: TemplateRef, static: true }) modal?: TemplateRef<any>;
  modalRef?: any;
  isFormValid: boolean = true;

  constructor(private toastr: ToastrService, private patientService: PatientService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.patientService.searchAllPatients().subscribe(patients => {
      this.patients = patients as Patient[] ?? [];
      this.searchText.next("");
    })
  }

  onFilter(ev: any) {
    this.searchText.next(ev.target.value);
  }

  searchPatient(id: number) {
    this.patientService.searchPatientById(id).subscribe(res => {
      this.patient = res;
    })
  }

  initializeModal(id: number | undefined) {
    if(!id) this.isAdd = true;
    else this.searchPatient(id);
  }

  onDelete(id: number){
    this.patientService.deletePatient(id).subscribe(res => {
      this.search();
    });
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      this.isFormValid = false;
      form.form.markAllAsTouched();
      return;
    }

    this.addUpdate(this.patient, this.id);
    this.close();
  }
  
  close() {
    this.modalRef.close();
  }
  
  onAddEdit(id: number | undefined){
    this.id = id;
    this.modalRef = this.modalService.open(this.modal);
    this.modalRef.result.finally(() => {
      this.id = 0; 
      this.patient = {};
      this.isFormValid = true;
    });
    this.initializeModal(id);
  }

  addUpdate(patient: Patient, id?: number){
    this.patientService.addUpdatePatient(patient, id).subscribe(res => {
      this.search();
      this.toastr.success('Successful!');
    },
    () => {
      this.toastr.error('Failed!');
    });
  }
  
}
