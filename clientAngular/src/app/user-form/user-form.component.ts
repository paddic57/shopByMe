import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {


  user: User
  private userId: number
  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserServiceService,
    private router: Router) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe( x => {
        this.userId = x['id']})    
        this.userService.getById(this.userId).subscribe(resp => {
          this.user = resp
        })
        console.log(this.user)
    }
    onSubmit(event: NgForm):void{
      console.log(event.form.value)
      this.userService.put(this.userId, event.form.value).subscribe({next: x => {
          this.router.navigateByUrl("users")
      }, error: error => {
          console.log(error)
      }})
    }
    onCancel():void {
      this.router.navigateByUrl("users")
    }

}
