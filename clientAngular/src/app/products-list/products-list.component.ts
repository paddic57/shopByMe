import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from '.././products-service.service';
import { Product } from '.././models/product';
import { BasketItem } from '.././models/basketItem';
import { BasketServiceService } from '.././basket-service.service';
import { Pagination } from '../models/pagination';
import { Router } from '@angular/router';
import { BasketListComponent } from '../basket-list/basket-list.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent{

  products: Product[] = [];




  page: number = 1;
  rowsPerPage: number = 10;


  public addToBasket(product: Product): void{
    this.basketService.post(product.id, 1).subscribe();
  }
  public editToBasket(product: Product): void{
    this.router.navigateByUrl('products/edit/' + product.id)
  }
  public deleteProduct(product: Product): void{
    this.productService.delete(product.id).subscribe(resp1 => this.productService.get().subscribe(resp2=> this.products = resp2.data))
  }
  public async refresh():Promise<void> {
    let pagination = new Pagination();
    pagination.page = this.page;
    pagination.sortAscending = true;
    pagination.sortColumn = "Name";
    pagination.rowsPerPage = this.rowsPerPage;
    this.productService.get(pagination).subscribe(response => this.products = response.data)
  }
  constructor( private productService: ProductsServiceService,private basketService: BasketServiceService, private router: Router){
    productService.get().subscribe(responce => this.products = responce.data);

    
  }
  public addNewProduct(){
    this.router.navigateByUrl("products/add")
  }
  ngOnInit(): void {
    
  }

}
