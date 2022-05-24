import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { BasketComponent } from './basket/basket.component';

import{HttpClientModule} from '@angular/common/http';
import { UsersListComponent } from './users-list/users-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { BasketListComponent } from './basket-list/basket-list.component'
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routing';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form/product-form.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UserFormComponent } from './user-form/user-form.component';
import { UserComponent } from './user/user.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { ProductsAddComponent } from './products-add/products-add.component';


export function tokenGetter(){
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    BasketComponent,
    UsersListComponent,
    ProductsListComponent,
    BasketListComponent,
    ProductFormComponent,
    LoginComponent,
    UserFormComponent,
    UserComponent,
    UsersAddComponent,
    ProductsAddComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    FormsModule, 
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44373"]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

