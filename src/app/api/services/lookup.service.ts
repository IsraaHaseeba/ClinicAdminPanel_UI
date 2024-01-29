import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/app/constants';
import { Lookup } from '../models/Lookup';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  constructor(private httpClient: HttpClient) {}

  searchAllLookups(): Observable<Object> {
    return this.httpClient.get(url + 'Lookup/GetAll');
  }

  searchLookupById(id: number): Observable<Object> {
    return this.httpClient.get(url + 'Lookup/GetById/' + id);
  }

  searchLookupsByCategory(code: string) {
    return this.httpClient.get(url +'Lookup/GetLookupsByCategory/' + code);
  }

  addUpdateLookup(lookup: Lookup, id?: number) {
    return this.httpClient.post(url + 'Lookup/AddUpdate/' + (id == undefined ? '' : id), lookup);  
  }

  deleteLookup(id: number) {
    return this.httpClient.delete(url + 'Lookup/Delete/' + id);
  }
}
