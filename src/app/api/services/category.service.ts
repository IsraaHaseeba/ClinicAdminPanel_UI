import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryEndpoint, DoctorEndpoints, Models } from '../constnts';
import { Observable } from 'rxjs';
import { url } from 'src/app/constants';
import { Doctor } from '../models/Doctor';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<Object> {
    return this.httpClient.get(url + Models.Category + CategoryEndpoint.getAll);
  }

  getCategoryById(id: number): Observable<Object> {
    return this.httpClient.get(url + Models.Category + CategoryEndpoint.getById, {
      params: {
        id: id
      },
    });
  }

  addUpdateCategory(category: Category, id?: number) {
    let params = {};
    if(id) params = {...params, id: id};

    return this.httpClient.post(url + Models.Category + CategoryEndpoint.addUpdate, category, {
      params: params
    });
  }  

  checkIfCodeExist(code: string, id?: number) {
    let params: any = {code: code};
    if(id) params = {...params, id: id};
    return this,this.httpClient.get(url + Models.Category + CategoryEndpoint.checkIfCodeExist, {
      params: params
    })
  }

  getByCode(code: string) {
    return this,this.httpClient.get(url + Models.Category + CategoryEndpoint.getByCode, {
      params: {code: code}
    })
  }
}
