import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDataService} from "../../user-data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(public userDataService:UserDataService,private router:Router,
              public route:ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'uname':new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      }),
      'password': new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]
      })
    });
  }

  onLogin() {
    if(this.form.invalid){
      return;
    }
    console.log(this.form.value.uname,this.form.value.password);
      const token = this.userDataService.login(
          this.form.value.uname,
          this.form.value.password)
          .subscribe( res => {
            console.log(res);
          });
      this.router.navigate(['/home']);

    this.form.reset();
  }
}
