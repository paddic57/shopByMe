import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItem } from './models/basketItem';

@Injectable({
  providedIn: 'root'
})
export class BasketServiceService {


  
  constructor(private httpClient: HttpClient) { }
  post(productId: number, count: number):Observable<BasketItem[]>{
      return this.httpClient.post<BasketItem[]>('https://localhost:44373/api/Basket/' + productId, count)
  }
  clear():Observable<BasketItem[]>{
    return this.httpClient.delete<BasketItem[]>('https://localhost:44373/api/Basket/clear')
  }
  delete(productId: number):Observable<BasketItem[]>{
    return this.httpClient.delete<BasketItem[]>('https://localhost:44373/api/Basket/' + productId)
  }
  get():Observable<BasketItem[]>{
    return this.httpClient.get<BasketItem[]>('https://localhost:44373/api/Basket/')
  }
  put(basketItemId: number, basketItemCount: number):Observable<BasketItem[]>{
    return this.httpClient.get<BasketItem[]>('https://localhost:44373/api/Basket/' + basketItemId + "?count=" + basketItemCount)
  }


}
