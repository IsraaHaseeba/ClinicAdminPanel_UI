import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LookupEndpoint, Models } from '../constnts';
import { Observable } from 'rxjs';
import { url } from 'src/app/constants';
import { Lookup } from '../models/Lookup';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  constructor(private httpClient: HttpClient) {}

  getAllLookups(): Observable<Object> {
    return this.httpClient.get(url + Models.Lookup + LookupEndpoint.getAll);
  }

  getLookupById(id: number): Observable<Object> {
    return this.httpClient.get(url + Models.Lookup + LookupEndpoint.getById, {
      params: {
        id: id
      },
    });
  }

  addUpdateLookup(lookup: Lookup, id?: number) {
    let params = {};
    if(id) params = {...params, id: id};

    return this.httpClient.post(url + Models.Lookup + LookupEndpoint.addUpdate, lookup, {
      params: params
    });  
  }
}
