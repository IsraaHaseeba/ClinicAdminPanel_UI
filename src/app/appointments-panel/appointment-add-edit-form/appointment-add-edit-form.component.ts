import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from 'src/app/api/models/Appointment';
import { Doctor } from 'src/app/api/models/Doctor';
import { Patient } from 'src/app/api/models/Patient';
import { DoctorService } from 'src/app/api/services/doctor.service';
import { PatientService } from 'src/app/api/services/patient.service';

@Component({
  selector: 'app-appointment-add-edit-form',
  templateUrl: './appointment-add-edit-form.component.html',
  styleUrls: ['./appointment-add-edit-form.component.css'],
})
export class AppointmentAddEditFormComponent implements OnInit {
  @Input() appointment: Appointment = {};
  @Input() id?: number;
  @Output() appointmentEmmitter: EventEmitter<Appointment> = new EventEmitter<Appointment>();
  doctors: Doctor[] = [];
  patients: Patient[] = [];
  isAdd: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    if(!this.id && JSON.stringify(this.appointment) == '{}') this.isAdd = true;
    this.getDoctors();
    this.getPatients();
  }

  getDoctors() {
    this.doctorService.getAllDoctors().subscribe((doctors) => {
      this.doctors = (doctors as Doctor[]) ?? [];
    });
  }

  getPatients() {
    this.patientService.getAllPatients().subscribe((patients) => {
      this.patients = (patients as Patient[]) ?? [];
    });
  }

  OnSave() {
    this.appointmentEmmitter?.emit(this.appointment);
    this.close();
  }

  close() {
    this.activeModal.close();
  }
}
