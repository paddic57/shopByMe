import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BasketItem } from '../models/basketItem';
import { Product } from '../models/product';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  private showButton: boolean = true;
  private totalPrice: number;
  @Input("data") public basket: BasketItem[];

  @Output("onClearClick") public onClearBasket: EventEmitter<void> = new EventEmitter<void>();
  @Output("onPlusClick") public onBasketButtonPlus: EventEmitter<BasketItem> = new EventEmitter<BasketItem>();
  @Output("onMinusClick") public onBasketButtonMinus: EventEmitter<BasketItem> = new EventEmitter<BasketItem>();
  @Output("onDeleteClick") public onBasketButtonDelete: EventEmitter<BasketItem> = new EventEmitter<BasketItem>();

  public showClearBasketButton(): boolean{
    return this.basket.length > 0;
  }
  public changeButtonWyswietlName(): void{
    var element = document.getElementById("buttonWyswietl");
    this.showButton = !this.showButton
    console.log(this.showButton)
    if(element.textContent == "Wyświetl"){
      element.textContent = "Ukryj"
    }  
    else
      element.textContent = "Wyświetl"
  }
  public showButtonWyswietlUkryj(): boolean{
    return this.showButton
  }
  public getTotalPriceInBasket(): number{
    this.totalPrice = 0
    for(let i = 0; i<this.basket.length; i++){
      this.totalPrice += this.basket[i].price
    }
    this.totalPrice = Math.round(this.totalPrice*100)/100
    return this.totalPrice
  }
  public getNumberOfProductInBasket() :number{
    return this.basket.length;
  }
  public clearBasket(): void {
    this.totalPrice = 0;
    this.onClearBasket.emit();
  }
  public basketButtonPlus(basketItem: BasketItem): void{
    basketItem.count +=1;
    this.onBasketButtonPlus.emit(basketItem);
  }
  public basketButtonMinus(basketItem: BasketItem): void{
    if(basketItem.count>1){
      basketItem.count -=1;
      this.onBasketButtonMinus.emit(basketItem);
    }
    else
      this.onBasketButtonDelete.emit(basketItem);   
  }
  public basketButtonDelete(basketItem: BasketItem): void{
    this.onBasketButtonDelete.emit(basketItem);
  }
  constructor() { }

  ngOnInit(): void {
  }


}
