import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserDataService} from "../../user-data.service";
import {AuthService} from "../auth.service";
import {invalid} from "@angular/compiler/src/render3/view/util";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email ;
  password ;
  error = 'Error, expected `email` to be unique.';
  emailTakenErr:boolean;
  constructor(private userDataService:AuthService) { }

  ngOnInit() {
  }

  onSignup(form:NgForm){
    if(form.invalid){
      return;
    }
    console.log(form.value);
    this.email =form.value.email;
    this.password =form.value.password;
    this.userDataService.createUser(this.email,this.password)
        .subscribe( res => {
          console.log('sign up reaponse in comp - ',res);
          if(res.includes(this.error)){
            alert(res);
          }
        });
  }
}
