import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedData } from './models/paginatedData';
import { Product } from './models/product';
import { Pagination } from './models/pagination';
import { PostProductDto } from './models/post-product';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  constructor(private httpClient: HttpClient) { }
  
  get(pagination?: Pagination): Observable<PaginatedData<Product>>{
    
    if(pagination == null){
      pagination = new Pagination();
      pagination.page = 0;
      pagination.rowsPerPage =10;
      pagination.sortAscending = true;
      pagination.sortColumn = "Name";
        
      
    }


    return this.httpClient.get<PaginatedData<Product>>('https://localhost:44373/api/Products?SortColumn='
    +(pagination?.sortColumn)
    +"&Page=" + (pagination?.page)
    +"&rowsPerPage=" + (pagination?.rowsPerPage)
    +'&SortAscending=' + (pagination?.sortAscending));
  }
  getById(id: number): Observable<Product>{
    return this.httpClient.get<Product>("https://localhost:44373/api/Products/"+id);
  }
  put(id: number, dto: PostProductDto): Observable<Product>{
    return this.httpClient.put<Product>("https://localhost:44373/api/Products/" + id,dto)
  }
  delete(id: number): Observable<Product>{
    return this.httpClient.delete<Product>("https://localhost:44373/api/Products/" + id)
  }
}
