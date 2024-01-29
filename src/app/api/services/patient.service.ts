import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/app/constants';
import { Patient } from '../models/Patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private httpClient: HttpClient) {}

  searchAllPatients(): Observable<Object> {
    return this.httpClient.get(url + 'Patient/GetAll');
  }

  searchPatientById(id: number): Observable<Object> {
    return this.httpClient.get(url + 'Patient/GetById/' + id);
  }

  addUpdatePatient(patient: Patient, id?: number) {
    return this.httpClient.post(url + 'Patient/AddUpdate/' + (id == undefined ? '' : id), patient);
  }

  deletePatient(id: number) {
    return this.httpClient.delete(url + 'Patient/Delete/' + id)
  }
}
