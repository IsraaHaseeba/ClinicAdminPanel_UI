import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/app/constants';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  searchAllCategories(): Observable<Object> {
    return this.httpClient.get(url + 'Category/GetAll');
  }

  searchCategoryById(id: number): Observable<Object> {
    return this.httpClient.get(url + 'Category/GetById/' + id);
  }

  addUpdateCategory(category: Category, id?: number) {
    return this.httpClient.post(url + 'Category/AddUpdate/' + (id == undefined ? '' : id), category);
  }  

  checkIfCodeExist(code: string, id?: number) {
    return this,this.httpClient.get(url + 'Category/CheckIfCodeExist/' + code + '/' + (id == undefined ? '' : id))
  }

  searchByCode(code: string) {
    return this,this.httpClient.get(url + 'Category/GetByCode/' + code)
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(url + 'Category/Delete/' + id);
  }
}
