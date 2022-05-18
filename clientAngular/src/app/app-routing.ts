import { BasketListComponent } from "./basket-list/basket-list.component";
import { ProductsListComponent } from "./products-list/products-list.component";
import { Routes } from "@angular/router"
import { UsersListComponent } from "./users-list/users-list.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { LoginComponent } from "./login/login.component";
import { UserFormComponent } from "./user-form/user-form.component";


export const APP_ROUTES: Routes = [
    {path: 'products', component: ProductsListComponent},
    {path: 'basket', component: BasketListComponent},
    {path: 'users', component: UsersListComponent},
    {path: 'login', component: LoginComponent},
    {path: 'products/:id', component: ProductFormComponent},
    {path: 'users/:id', component: UserFormComponent},
    {path: '', redirectTo: 'products', pathMatch: 'full'},  
]