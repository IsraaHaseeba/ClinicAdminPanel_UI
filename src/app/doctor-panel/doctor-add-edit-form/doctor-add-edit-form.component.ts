import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Doctor } from 'src/app/api/models/Doctor';
import { CategoryService } from 'src/app/api/services/category.service';

@Component({
  selector: 'app-doctor-add-edit-form',
  templateUrl: './doctor-add-edit-form.component.html',
  styleUrls: ['./doctor-add-edit-form.component.css']
})
export class DoctorAddEditFormComponent {
  @Input() doctor: Doctor = {};
  @Input() id?: number;
  @Output() doctorEmitter: EventEmitter<Doctor> = new EventEmitter<Doctor>();
  isAdd: boolean = false;
  fromTime?: any;
  toTime?: any;
  specifications?: any = [];
  locations?: any = [];


  constructor(
    private activeModal: NgbActiveModal, private categoryService: CategoryService
  ) {}

  ngOnInit() {
    if(!this.id && JSON.stringify(this.doctor) == '{}') this.isAdd = true;
    else {
      if(this.doctor.fromWorkingHour) this.fromTime = this.dateToTime(this.doctor.fromWorkingHour); 
        if(this.doctor.toWorkingHour) this.toTime = this.dateToTime(this.doctor.toWorkingHour); 
    }

    this.getLookups('123d').subscribe(res => this.specifications = res ?? []);
    this.getLookups('122').subscribe(res => this.locations = res ?? []);
  }
 
  getLookups(code: string) {
    return this.categoryService.getByCode(code);
  }

  OnSave() {
    this.doctor.toWorkingHour = this.timeToDate(this.toTime);
    this.doctor.fromWorkingHour = this.timeToDate(this.fromTime);
    
    this.doctorEmitter?.emit(this.doctor);
    this.close();
  }

  onNameChange(ev: any) {
    this.doctor.name = ev.target.value;
  }

  dateToTime(dateInput: any) {
        let date = new Date(dateInput);
        let hours = date.getHours()
        let min = date.getMinutes() 
        return `${String(hours).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
  }

  timeToDate(time: any) {
    const date = new Date();
    if(time){
      const timeParts = time.split(':');
      date.setHours(parseInt(timeParts[0], 10));
      date.setMinutes(parseInt(timeParts[1], 10));
    }
    
    return date;
  }

  close() {
    this.activeModal.close();
  }
}
