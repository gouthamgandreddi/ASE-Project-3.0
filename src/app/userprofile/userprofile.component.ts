import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  public userName : string;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.userName = localStorage.getItem('username');
  }

<<<<<<< HEAD
   // message ='user'
=======
   message ='user';
>>>>>>> b333ed7f5cc3016a71d43803b46774706f7b2d5c
}
