import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router){}
  canActivate(){
    const token = localStorage.getItem("jwt")
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(["login"])
    return false;
    
  }
  getRole(): string{
    const role = JSON.stringify(this.jwtHelper.decodeToken(localStorage.getItem("jwt")))
        .split(",")[2]
        .split(":")[2]
        .slice(1, -1)
    return role
  }
  haveAccessAdmin(): boolean{
    if(this.getRole()=="Admin")
      return true
    return false;
  }
  

  
}
