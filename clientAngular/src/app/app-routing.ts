import { BasketListComponent } from "./basket-list/basket-list.component";
import { ProductsListComponent } from "./products-list/products-list.component";
import { Routes } from "@angular/router"
import { UsersListComponent } from "./users-list/users-list.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { LoginComponent } from "./login/login.component";
import { UserFormComponent } from "./user-form/user-form.component";
import { UsersAddComponent } from "./users-add/users-add.component";
import { ProductsAddComponent } from "./products-add/products-add.component";
import { AuthGuard } from "./auth.guard";


export const APP_ROUTES: Routes = [
    {path: 'products', component: ProductsListComponent, canActivate: [AuthGuard]},
    {path: 'basket', component: BasketListComponent, canActivate: [AuthGuard]},
    {path: 'users', component: UsersListComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'products/edit/:id', component: ProductFormComponent, canActivate: [AuthGuard]},
    {path: 'users/edit/:id', component: UserFormComponent, canActivate: [AuthGuard]},
    {path: 'users/add', component: UsersAddComponent, canActivate: [AuthGuard]},
    {path: 'products/add', component: ProductsAddComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: 'products', pathMatch: 'full'},  
]