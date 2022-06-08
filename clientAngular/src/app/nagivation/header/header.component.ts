import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  @Output() public onLogoutClick = new EventEmitter(); 

  isUserAuthenticated: boolean;
  constructor(private router: Router) { }

  ngOnInit() {

  }
  emitLogout(){
    this.onLogoutClick.emit();
  }
  public onToggleSidenav(){
    this.sidenavToggle.emit();
  }
  showLogoutButton(): boolean{
    if(localStorage.getItem("jwt") != null){
      return true;
    }
    return false;
  }

}
