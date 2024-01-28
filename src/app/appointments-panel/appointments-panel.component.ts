import { Component } from '@angular/core';
import { Appointment } from '../api/models/Appointment';
import { AppointmentService } from '../api/services/appointment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentAddEditFormComponent } from './appointment-add-edit-form/appointment-add-edit-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointments-panel',
  templateUrl: './appointments-panel.component.html',
  styleUrls: ['./appointments-panel.component.css']
})
export class AppointmentsPanelComponent {
  appointments: Appointment[] = [];
  tableColumns = ['Doctor', 'Patient', 'Visit', ''];

  constructor(private toastr: ToastrService,private appointmentService: AppointmentService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.appointmentService.searchAllAppoinments().subscribe(appointments => {
      this.appointments = appointments as Appointment[] ?? [];
    })
  }

  onDelete(id: number){
    this.appointmentService.deleteAppointment(id).subscribe(res => {
      this.search();
    });
  }

  onAddEdit(id: number | undefined){
    const modalRef = this.modalService.open(AppointmentAddEditFormComponent);
		modalRef.componentInstance.id = id;
    modalRef.componentInstance.appointmentEmmitter.subscribe((res: any) => {
      this.addUpdate(res, id);
      })
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
