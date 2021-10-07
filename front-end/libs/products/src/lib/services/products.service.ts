import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseCategoryApiUrl = environment.apiUrl + 'categories/';
  baseProductApiUrl = environment.apiUrl + 'products/';

  constructor(private http: HttpClient) { }

  // Categories
  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(this.baseCategoryApiUrl);
  }

  getCategory(categoryId: string) : Observable<Category> {
    return this.http.get<Category>(this.baseCategoryApiUrl + categoryId);
  }

  createCategory(category: Category) :Observable<Category> {
    return this.http.post(this.baseCategoryApiUrl, category);
  }

  deleteCategory(categoryId: string) {
    return this.http.delete(this.baseCategoryApiUrl + categoryId);
  }

  updateCategory(category: Category) :Observable<Category> {
    return this.http.put(this.baseCategoryApiUrl + category.id, category);
  }

  // Products
  getProducts(categoriesFilter?: string[]) : Observable<Product[]> {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }
    return this.http.get<Product[]>(this.baseProductApiUrl, {params: params});
  }

  getFeaturedProducts(count: number) : Observable<Product[]> {
    return this.http
    .get<Product[]>(this.baseProductApiUrl + '/get/featured/' + count)
    .pipe(map((objectValue: any) => objectValue.result));
  }

  getProduct(productId: string) : Observable<Product> {
    return this.http.get<Product>(this.baseProductApiUrl + productId);
  }

  createProduct(productData: FormData) :Observable<Product> {
    return this.http.post<Product>(this.baseProductApiUrl, productData);
  }

  updateProduct(productData: FormData, productId: string) :Observable<Product> {
    return this.http.put(this.baseProductApiUrl + productId, productData);
  }

  deleteProduct(productId: string) {
    return this.http.delete(this.baseProductApiUrl + productId);
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get(`${this.baseProductApiUrl}/get/count`)
      .pipe(map((objectValue: any) => objectValue.result));
  }

}
