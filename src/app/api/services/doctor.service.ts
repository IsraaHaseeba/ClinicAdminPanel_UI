import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorEndpoints, Models } from '../constnts';
import { Observable } from 'rxjs';
import { url } from 'src/app/constants';
import { Doctor } from '../models/Doctor';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private httpClient: HttpClient) {}

  searchAllDoctors(): Observable<Object> {
    return this.httpClient.get(url + Models.Doctor + DoctorEndpoints.getAll);
  }

  searchDoctorById(id: number): Observable<Object> {
    return this.httpClient.get(url + Models.Doctor + DoctorEndpoints.getById, {
      params: {
        id: id
      },
    });
  }

  addUpdateDoctor(doctor: Doctor, id?: number) {
    let params = {};
    if(id) params = {...params, id: id};

    return this.httpClient.post(url + Models.Doctor + DoctorEndpoints.addUpdate, doctor, {
      params: params
    });
  }  

  deleteDoctor(id: number) {
    return this.httpClient.delete(url + Models.Doctor + DoctorEndpoints.delete, {
      params: {id: id}
    })
  }
}
