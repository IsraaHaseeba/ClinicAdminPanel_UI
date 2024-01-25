import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryEndpoint, Models } from '../constnts';
import { Observable } from 'rxjs';
import { url } from 'src/app/constants';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  searchAllCategories(): Observable<Object> {
    return this.httpClient.get(url + Models.Category + CategoryEndpoint.getAll);
  }

  searchCategoryById(id: number): Observable<Object> {
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

  searchByCode(code: string) {
    return this,this.httpClient.get(url + Models.Category + CategoryEndpoint.getByCode, {
      params: {code: code}
    })
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(url + Models.Category + CategoryEndpoint.delete, {
      params: {id: id}
    })
  }
}
