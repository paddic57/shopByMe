import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit  {
  @Input() public product: Product;
  @Output() public onAddToBasket: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() public onEditToBasket: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() public onDeleteProduct: EventEmitter<Product> = new EventEmitter<Product>();
  constructor() { }

  public addProductToBasket(product: Product): void{
    this.onAddToBasket.emit(product);
  }
  public editProductToBasket(product: Product): void{
    this.onEditToBasket.emit(product);
  }
  public deleteProduct(product: Product): void{
    this.onDeleteProduct.emit(product);
  }
 ngOnInit():void{

 }



}

