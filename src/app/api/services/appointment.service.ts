import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentEndpoint, Models } from '../constnts';
import { Observable } from 'rxjs';
import { url } from 'src/app/constants';
import { Appointment } from '../models/Appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private httpClient: HttpClient) {}

  getAllAppoinments(): Observable<Object> {
    return this.httpClient.get(url + Models.Appointments + AppointmentEndpoint.getAll);
  }

  getAppoinmentById(id: number): Observable<Object> {
    return this.httpClient.get(url + Models.Appointments + AppointmentEndpoint.getById, {
      params: {
        id: id
      },
    });
  }

  addUpdateAppointment(appoinment: Appointment, id?: number) {
    let params = {};
    if(id) params = {...params, id: id};
    
    return this.httpClient.post(url + Models.Appointments + AppointmentEndpoint.addUpdate, appoinment, {
      params: params
    });
  }
}