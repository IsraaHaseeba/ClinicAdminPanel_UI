import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/app/constants';
import { Doctor } from '../models/Doctor';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private httpClient: HttpClient) {}

  searchAllDoctors(): Observable<Object> {
    return this.httpClient.get(url + 'Doctor/GetAll');
  }

  searchDoctorById(id: number): Observable<Object> {
    return this.httpClient.get(url + 'Doctor/GetById/' + id);
  }

  addUpdateDoctor(doctor: Doctor, id?: number) {
    return this.httpClient.post(url + 'Doctor/AddUpdate/' + (id == undefined ? '' : id), doctor);
  }  

  deleteDoctor(id: number) {
    return this.httpClient.delete(url + 'Doctor/Delete/' + id);
  }
}
