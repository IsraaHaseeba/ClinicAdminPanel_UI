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

  searchAllLookups(): Observable<Object> {
    return this.httpClient.get(url + Models.Lookup + LookupEndpoint.getAll);
  }

  searchLookupById(id: number): Observable<Object> {
    return this.httpClient.get(url + Models.Lookup + LookupEndpoint.getById, {
      params: {
        id: id
      },
    });
  }

  searchLookupsByCategory(code: string) {
    return this.httpClient.get(url + Models.Lookup + LookupEndpoint.getLookupsByCategory, {
      params: {
        code: code
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

  deleteLookup(id: number) {
    return this.httpClient.delete(url + Models.Lookup + LookupEndpoint.delete, {
      params: {id: id}
    })
  }
}
