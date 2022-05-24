import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() public user: User;
  @Output() public onEditUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() public onDeleteUser: EventEmitter<User> = new EventEmitter<User>();
  constructor() { }

  public editUser(product: User): void{
    this.onEditUser.emit(product);
  }
  public deleteUser(product: User): void{
    this.onDeleteUser.emit(product);
  }
  ngOnInit(): void {
  }

}
