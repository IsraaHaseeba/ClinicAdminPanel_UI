import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/app/constants';
import { Appointment } from '../models/Appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private httpClient: HttpClient) {}

  searchAllAppoinments(): Observable<Object> {
    return this.httpClient.get(url + 'Visit/GetAll');
  }

  searchAppoinmentById(id: number): Observable<Object> {
    return this.httpClient.get(url + 'Visit/GetById/' + id);
  }

  addUpdateAppointment(appoinment: Appointment, id?: number) {
    return this.httpClient.post(url + 'Visit/AddUpdate/' + (id == undefined ? '' : id), appoinment);
  }

  deleteAppointment(id: number) {
    return this.httpClient.delete(url + 'Visit/Delete/' + id);
  }
}
