import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PostProductDto } from '../models/post-product';
import { Product } from '../models/product';
import { ProductsServiceService } from '../products-service.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product
  private productId: number
  constructor(private activatedRoute: ActivatedRoute,
    private productsService: ProductsServiceService,
    private router: Router) { }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( x => {
      this.productId = x['id']})    
      this.productsService.getById(this.productId).subscribe(resp => {
        this.product = resp
      })
      console.log(this.product)
  }

  onSubmit(event: NgForm):void{
    console.log(event.form.value)
    this.productsService.put(this.productId, event.form.value).subscribe({next: x => {
        this.router.navigateByUrl("products")
    }, error: error => {
        console.log(error)
    }})
  }
  onCancel():void{
    this.router.navigateByUrl("products");
  }

}
