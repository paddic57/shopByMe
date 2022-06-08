import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
//import { ProductComponent } from './product/product.component';
import { ProductsServiceService } from './products-service.service';
import { Product } from './models/product';
import { BasketItem } from './models/basketItem';
import { BasketServiceService } from './basket-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab2';
  ngOnInit(): void {
    this.isUserAuthenticated()
  }
  constructor(private jwtHelper: JwtHelperService, private router: Router){}
  logOut(){
    localStorage.removeItem("jwt")
    this.router.navigateByUrl("login")
  }
  public isUserAuthenticated(){
    const token: string = localStorage.getItem("jwt")
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    else{
      return false;
    }
  }
}




