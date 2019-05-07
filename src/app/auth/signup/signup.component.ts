import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserDataService} from "../../user-data.service";
import {AuthService} from "../auth.service";
import {invalid} from "@angular/compiler/src/render3/view/util";
import {split} from "ts-node";

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

  response: any;
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
          this.response =res;
          var errorMessage = this.response.split("Value:");
          console.log(errorMessage);
          if(res.includes(this.error)){
            alert("User already exists with the mail - "+errorMessage[1]);
          }
        });
  }
}
