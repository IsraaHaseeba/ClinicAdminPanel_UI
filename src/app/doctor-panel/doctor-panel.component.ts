import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../api/services/doctor.service';
import { Doctor } from '../api/models/Doctor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorAddEditFormComponent } from './doctor-add-edit-form/doctor-add-edit-form.component';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-doctor-panel',
  templateUrl: './doctor-panel.component.html',
  styleUrls: ['./doctor-panel.component.css'],
})
export class DoctorPanelComponent implements OnInit {
  doctors: Doctor[] = [];
  tableColumns = ['Name', 'Specification', 'Location', 'Working Hour - From', 'Working Hour - To', ''];
  searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filteredData = this.searchText.pipe(
    map(searchText => {
      if(!searchText || !searchText.length) {
        return this.doctors;
      }
      return this.doctors.filter(d => d.name?.toLowerCase().includes(searchText.toLowerCase()) || d.locationName?.toLowerCase().includes(searchText.toLowerCase()) || d.specificationName?.toLowerCase().includes(searchText.toLowerCase()));
    })
  );
  
  constructor(private toastr: ToastrService, private doctorService: DoctorService, private modalService: NgbModal) {
    
  }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.doctorService.searchAllDoctors().subscribe(doctors => {
      this.doctors = doctors as Doctor[] ?? [];
      this.searchText.next("")
    })
  }

  onDelete(id: number){
    this.doctorService.deleteDoctor(id).subscribe(res => {
      this.search();
    });
  }

  onSearch(ev: any) {
    this.searchText.next(ev.target.value);
  }

  onAddEdit(id: number | undefined){
    const modalRef = this.modalService.open(DoctorAddEditFormComponent);
		modalRef.componentInstance.id = id;
    modalRef.componentInstance.doctorEmitter.subscribe((res: any) => {
      this.addUpdate(res, id);
    })
  }

  addUpdate(doctor: Doctor, id?: number){
    this.doctorService.addUpdateDoctor(doctor, id).subscribe(res => {
      this.search();
      this.toastr.success('Successful!');
    },
    () => {
      this.toastr.error('Failed!');
    });
  }
}
