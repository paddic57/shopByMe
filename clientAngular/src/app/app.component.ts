import { Component, OnInit, Input } from '@angular/core';
//import { ProductComponent } from './product/product.component';
import { ProductsServiceService } from './products-service.service';
import { Product } from './models/product';
import { BasketItem } from './models/basketItem';
import { BasketServiceService } from './basket-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab2';

  ngOnInit(): void {
    
  }
  


}




