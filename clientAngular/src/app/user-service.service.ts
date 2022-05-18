import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedData } from './models/paginatedData';
import { Pagination } from './models/pagination';
import { PostUsersDto } from './models/post-user';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient) { }
  get(pagination?: Pagination): Observable<PaginatedData<User>>{
  
    if(pagination == null){
      pagination = new Pagination();
      pagination.page = 0;
      pagination.rowsPerPage =10;
      pagination.sortAscending = true;
      pagination.sortColumn = "Name";
        
      
    }
  
  
    return this.httpClient.get<PaginatedData<User>>('https://localhost:44373/api/Users?SortColumn='
    +(pagination?.sortColumn)
    +"&Page=" + (pagination?.page)
    +"&rowsPerPage=" + (pagination?.rowsPerPage)
    +'&SortAscending=' + (pagination?.sortAscending));
  }
  getById(id: number): Observable<User>{
    return this.httpClient.get<User>("https://localhost:44373/api/Users/"+id);
  }
  put(id: number, dto: PostUsersDto): Observable<User>{
    return this.httpClient.put<User>("https://localhost:44373/api/Users/" + id,dto)
  }
}
