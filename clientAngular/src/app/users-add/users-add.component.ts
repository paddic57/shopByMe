import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, NgForm, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostUsersDto } from '../models/post-user';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {

  user: PostUsersDto
  private userId: number
  missmatchingPasswords: boolean

  private pass: string
  private passConf: string

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserServiceService,
    private router: Router) { }

    ngOnInit(): void {
      
    }
    // checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    //   let pass = group.get('Password').value;
    //   let confirmPass = group.get('ConfirmPassword').value
    //   return pass === confirmPass ? null : { notSame: true }
    // }
    onSubmit(event: NgForm):void{
      if(true){
        console.log(event.value)
        this.userService.post(event.form.value).subscribe({next: x => {
          this.router.navigateByUrl("products")
        }, error: error => {
          console.log(error)
        }})
      }
    }
    

}
