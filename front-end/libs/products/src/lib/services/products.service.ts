import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/v1/categories');
  }

  createCategory(category: Category) :Observable<Category> {
    return this.http.post('http://localhost:3000/api/v1/categories', category);
  }

  deleteCategory(categoryId: string) :Observable<Category> {
    return this.http.delete(`http://localhost:3000/api/v1/categories/${categoryId}`);
  }
}
