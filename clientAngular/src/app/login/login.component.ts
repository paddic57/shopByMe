import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  invalidLogin: boolean = false
  constructor(private http: HttpClient, private router: Router) { }

  login(form: NgForm){
    const credentials = JSON.stringify(form.value);
    console.log(form.value)
    this.http.post("https://localhost:44373/api/Authorization/login",credentials,{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
      .subscribe(resp => {
        const token = (<any>resp).token;
        localStorage.setItem("jwt", token)
        this.invalidLogin = false;
        this.router.navigate([""]);

      }, err => {
                  this.invalidLogin = true;
      })
  }
}
