import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Models, PatientEndpoints } from '../constnts';
import { Observable } from 'rxjs';
import { url } from 'src/app/constants';
import { Patient } from '../models/Patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private httpClient: HttpClient) {}

  getAllPatients(): Observable<Object> {
    return this.httpClient.get(url + Models.Patient + PatientEndpoints.getAll);
  }

  getPatientById(id: number): Observable<Object> {
    return this.httpClient.get(url + Models.Patient + PatientEndpoints.getById, {
      params: {
        id: id
      },
    });
  }

  addUpdatePatient(patient: Patient, id?: number) {
    let params = {};
    if(id) params = {...params, id: id};

    return this.httpClient.post(url + Models.Patient + PatientEndpoints.addUpdate, patient, {
      params: params
    });
  }
}