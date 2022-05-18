import { Component, OnInit } from '@angular/core';
import { BasketItem } from '../models/basketItem';
import { BasketServiceService } from '.././basket-service.service';
import { Router } from '@angular/router';
import { Pagination } from '../models/pagination';

@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.css']
})
export class BasketListComponent implements OnInit {


  constructor(private basketService: BasketServiceService, private router: Router){
    basketService.get().subscribe(response => this.basket = response)
   }

  ngOnInit(): void {
  }

  public basket: BasketItem[] = [];

  public basketButtonPlus(basketItem: BasketItem): void{
    this.basketService.put(basketItem.id, basketItem.count).subscribe(response => this.basket = response);
  }
  public basketButtonMinus(basketItem: BasketItem): void{
    this.basketService.put(basketItem.id, basketItem.count).subscribe(response => this.basket = response);
  }
  public basketButtonDelete(basketItem: BasketItem): void{
    this.basketService.delete(basketItem.id).subscribe(response => this.basket = response);
  }
  public clearBasket(): void{
    this.basketService.clear().subscribe()
    this.basket = []
  }

}
