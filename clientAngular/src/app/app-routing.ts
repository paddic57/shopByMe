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
import { RoleAdminGuard } from "./role-admin.guard";


export const APP_ROUTES: Routes = [
    {path: 'products', component: ProductsListComponent, canActivate: [AuthGuard]},
    {path: 'basket', component: BasketListComponent, canActivate: [AuthGuard]},
    {path: 'users', component: UsersListComponent, canActivate: [RoleAdminGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'products/edit/:id', component: ProductFormComponent, canActivate: [RoleAdminGuard]},
    {path: 'users/edit/:id', component: UserFormComponent, canActivate: [RoleAdminGuard]},
    {path: 'users/add', component: UsersAddComponent, canActivate: [RoleAdminGuard]},
    {path: 'products/add', component: ProductsAddComponent, canActivate: [RoleAdminGuard]},
    {path: '', redirectTo: 'products', pathMatch: 'full'},  
]