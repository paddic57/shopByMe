import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormGroup, NgForm, Validators, ValidatorFn, UntypedFormControl, ReactiveFormsModule, ValidationErrors, RequiredValidator, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostUsersDto } from '../models/post-user';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {

  user: PostUsersDto = new PostUsersDto()
  private userId: number

  userForm: UntypedFormGroup

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserServiceService,
    private router: Router, private formBuilder: UntypedFormBuilder) {
      this.userForm = this.formBuilder.group({
        surname: new UntypedFormControl('', Validators.required),
        login: new UntypedFormControl('', Validators.required),
        name: new UntypedFormControl('', Validators.required),
        password: new UntypedFormControl('', Validators.required),
        passwordConfirm: new UntypedFormControl('', Validators.required),
      },{
        validators: this.matchPassword('password', 'passwordConfirm')
      })
     }

    ngOnInit(): void {
      
    }

    matchPassword(controlName1: string, controlName2: string){
      return (formGroup: UntypedFormGroup) =>{
        const control1 = formGroup.controls[controlName1]
        const control2 = formGroup.controls[controlName2]

        if(control2.value.errors && !control2.errors['matchPassword']){
          return
        }
        if (control1.value !== control2.value) {
          control2.setErrors({ matchPassword: true });
        } else {
          control2.setErrors(null);
        }
        return null;
      }
    }
    onSubmit():void{
      if(this.userForm.status == 'VALID'){
          this.user.login = this.userForm.controls["login"].value;
          this.user.password = this.userForm.controls["password"].value;
          this.user.surname = this.userForm.controls["surname"].value;
          this.user.name = this.userForm.controls["name"].value;
          
          this.userService.post(this.user).subscribe({next: x =>{
            this.router.navigateByUrl("products")
          }
          , error: error =>{
            console.log(error)
          }
          })
      }
    }
    

}
