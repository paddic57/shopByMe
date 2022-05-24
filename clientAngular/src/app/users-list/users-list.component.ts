import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from '../models/pagination';
import { User } from '../models/user';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  page: number = 1;
  rowsPerPage: number = 10;

  constructor(private userService: UserServiceService,
    private router: Router) {
      userService.get().subscribe(resp => this.users = resp.data)
     }

    

  ngOnInit(): void {
  }

  public editUser(user: User): void{
    this.router.navigateByUrl('users/edit/' + user.id)
  }
  public deleteUser(user: User):void {
    this.userService.delete(user.id).subscribe(resp1 => this.userService.get().subscribe(resp2 => this.users = resp2.data))
  }


  public refresh():void {
    let pagination = new Pagination();
    pagination.page = this.page;
    pagination.sortAscending = true;
    pagination.sortColumn = "Name";
    pagination.rowsPerPage = this.rowsPerPage;
    this.userService.get(pagination).subscribe(response => this.users = response.data)

  }
  public addNewUser():void{
    this.router.navigateByUrl("users/add")
  }

}
