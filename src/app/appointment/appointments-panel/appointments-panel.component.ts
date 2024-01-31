import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Appointment } from '../../api/models/Appointment';
import { AppointmentService } from '../../api/services/appointment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { Doctor } from '../../api/models/Doctor';
import { Patient } from '../../api/models/Patient';
import { DoctorService } from '../../api/services/doctor.service';
import { PatientService } from '../../api/services/patient.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-appointments-panel',
  templateUrl: './appointments-panel.component.html',
  styleUrls: ['./appointments-panel.component.css']
})
export class AppointmentsPanelComponent {
  appointments: Appointment[] = [];
  tableColumns = ['Doctor', 'Patient', 'Visit', ''];
  searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');
  appointment: Appointment = {};
  id?: number;
  doctors: Doctor[] = [];
  patients: Patient[] = [];
  isAdd: boolean = false;
  filteredData = this.searchText.pipe(
    map(searchText => {
      if(!searchText || !searchText.length) {
        return this.appointments;
      }
      return this.appointments.filter(d => d.doctorName?.toLowerCase().includes(searchText.toLowerCase()) || d.patientName?.toLowerCase().includes(searchText.toLowerCase()));
    })
  );
  @ViewChild('modal', { read: TemplateRef, static: true }) modal?: TemplateRef<any>;
  modalRef?: any;
  isFormValid: boolean = true;

  constructor(private toastr: ToastrService,  private doctorService: DoctorService,
    private patientService: PatientService, private appointmentService: AppointmentService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.search();
    this.searchDoctors();
    this.searchPatients();
  }

  search() {
    this.appointmentService.searchAllAppoinments().subscribe(appointments => {
      this.appointments = appointments as Appointment[] ?? [];
      this.searchText.next("");
    })
  }

  onFilter(ev: any) {
    this.searchText.next(ev.target.value);
  }

  initializeModal(id: number | undefined) {
    if(!id) this.isAdd = true;
    else this.searchAppointment(id);
  }

  searchAppointment(id: number) {
    this.appointmentService.searchAppoinmentById(id).subscribe(res => {
      this.appointment = res;
    })
  }

  searchDoctors() {
    this.doctorService.searchAllDoctors().subscribe((doctors) => {
      this.doctors = (doctors as Doctor[]) ?? [];
    });
  }

  searchPatients() {
    this.patientService.searchAllPatients().subscribe((patients) => {
      this.patients = (patients as Patient[]) ?? [];
    });
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      this.isFormValid = false;
      form.form.markAllAsTouched();
      return;
    }

    this.addUpdate(this.appointment, this.id);
    this.close();
  }

  close() {
    this.modalRef.close();
  }

  onDelete(id: number){
    this.appointmentService.deleteAppointment(id).subscribe(res => {
      this.search();
    });
  }

  onAddEdit(id: number | undefined){
    this.id = id;
    this.modalRef = this.modalService.open(this.modal);
    this.modalRef.result.finally(() => {
      this.id = 0; 
      this.appointment = {};
      this.isFormValid = true;
    });
    this.initializeModal(id);
  }
   
  addUpdate(appointment: Appointment, id?: number){
    this.appointmentService.addUpdateAppointment(appointment, id).subscribe(res => {
      this.search();
      this.toastr.success('Successful!');
    },
    () => {
      this.toastr.error('Failed!');
    });
  }
}
