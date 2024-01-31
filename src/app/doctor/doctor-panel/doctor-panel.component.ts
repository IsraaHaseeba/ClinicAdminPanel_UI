import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DoctorService } from '../../api/services/doctor.service';
import { Doctor } from '../../api/models/Doctor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { LookupService } from '../../api/services/lookup.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-doctor-panel',
  templateUrl: './doctor-panel.component.html',
  styleUrls: ['./doctor-panel.component.css'],
})
export class DoctorPanelComponent implements OnInit {
  doctors: Doctor[] = [];
  doctor: any = {};
  isAdd: boolean = false;
  id?: number;
  fromTime?: any;
  toTime?: any;
  lookupsLists: any = {};
  lookupsKeys = ['Specification', 'Location'];
  tableColumns = [
    'Name',
    'Specification',
    'Location',
    'Working Hour - From',
    'Working Hour - To',
    '',
  ];
  searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filteredData = this.searchText.pipe(
    map((searchText) => {
      if (!searchText || !searchText.length) {
        return this.doctors;
      }
      return this.doctors.filter(
        (d) =>
          d.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          d.locationName?.toLowerCase().includes(searchText.toLowerCase()) ||
          d.specificationName?.toLowerCase().includes(searchText.toLowerCase())
      );
    })
  );

  @ViewChild('modal', { read: TemplateRef, static: true }) modal?: TemplateRef<any>;
  modalRef?: any;
  isFormValid: boolean = true;

  constructor(
    private toastr: ToastrService,
    private doctorService: DoctorService,
    private modalService: NgbModal,
    private lookupService: LookupService
    ) {}

  ngOnInit(): void {
    this.search();
    this.lookupsKeys.forEach((lookup) => {
      this.searchLookups(lookup).subscribe((res) => {
        this.lookupsLists[lookup] = res ?? [];
      });
    });
  }

  search() {
    this.doctorService.searchAllDoctors().subscribe((doctors) => {
      this.doctors = (doctors as Doctor[]) ?? [];
      this.searchText.next('');
    });
  }

  searchLookups(code: string) {
    return this.lookupService.searchLookupsByCategory(code);
  }

  searchDoctor(id: number) {
    this.doctorService.searchDoctorById(id).subscribe((res) => {
      this.doctor = res;
      if (this.doctor.fromWorkingHour)
        this.fromTime = this.dateToTime(this.doctor.fromWorkingHour);
      if (this.doctor.toWorkingHour)
        this.toTime = this.dateToTime(this.doctor.toWorkingHour);
    });
  }

  initializeModal(id: number | undefined) {
    if (!id) this.isAdd = true;
    else {
      this.searchDoctor(id);
    }
  }

  onNameChange(ev: any) {
    this.doctor.name = ev.tarsearch.value;
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      this.isFormValid = false;
      form.form.markAllAsTouched();
      return;
    }

    this.doctor.toWorkingHour = this.timeToDate(this.toTime);
    this.doctor.fromWorkingHour = this.timeToDate(this.fromTime);
    this.addUpdate(this.doctor, this.id);
    this.close();
  }

  close() {
    this.modalRef.close();
  }

  dateToTime(dateInput: any) {
    let date = new Date(dateInput);
    let hours = date.getHours();
    let min = date.getMinutes();
    return `${String(hours).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
  }

  timeToDate(time: any) {
    const date = new Date();
    if (time) {
      const timeParts = time.split(':');
      date.setHours(parseInt(timeParts[0], 10));
      date.setMinutes(parseInt(timeParts[1], 10));
    }
    return date;
  }

  onDelete(id: number) {
    this.doctorService.deleteDoctor(id).subscribe((res) => {
      this.search();
    });
  }

  onFilter(ev: any) {
    this.searchText.next(ev.target.value);
  }

  onAddEdit(id: number | undefined) {
    this.id = id;
    this.modalRef = this.modalService.open(this.modal);
    this.modalRef.result.finally(() => {
      this.id = 0; 
      this.doctor = {};
      this.isFormValid = true;
      this.toTime = undefined;
      this.fromTime = undefined;
    });
    this.initializeModal(id);
  }

  addUpdate(doctor: Doctor, id?: number) {
    this.doctorService.addUpdateDoctor(doctor, id).subscribe(
      (res) => {
        this.search();
        this.toastr.success('Successful!');
      },
      () => {
        this.toastr.error('Failed!');
      }
    );
  }
}
