import { Component } from '@angular/core';
import { Appointment } from '../api/models/Appointment';
import { AppointmentService } from '../api/services/appointment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentAddEditFormComponent } from './appointment-add-edit-form/appointment-add-edit-form.component';

@Component({
  selector: 'app-appointments-panel',
  templateUrl: './appointments-panel.component.html',
  styleUrls: ['./appointments-panel.component.css']
})
export class AppointmentsPanelComponent {
  appointments: Appointment[] = [];
  tableColumns = ['Doctor', 'Patient', 'Visit', ''];

  constructor(private appointmentService: AppointmentService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.searchAppointments();
  }

  searchAppointments() {
    this.appointmentService.searchAllAppoinments().subscribe(appointments => {
      this.appointments = appointments as Appointment[] ?? [];
    })
  }

  onDelete(id: number){
    this.appointmentService.deleteAppointment(id).subscribe(res => {
      this.searchAppointments();
    });
  }

  onEdit(id: number){
    const modalRef = this.modalService.open(AppointmentAddEditFormComponent);
		modalRef.componentInstance.id = id;
    modalRef.componentInstance.appointmentEmmitter.subscribe((res: any) => {
      this.addUpdate(res, res.id);
      })
  }
   
  onAdd() {
    const modalRef = this.modalService.open(AppointmentAddEditFormComponent);
    modalRef.componentInstance.appointmentEmmitter.subscribe((res: any) => {
      this.addUpdate(res, undefined);
      })
  }

  addUpdate(appointment: Appointment, id?: number){
    this.appointmentService.addUpdateAppointment(appointment, id).subscribe(res => {
      this.searchAppointments();
    });
  }
}
