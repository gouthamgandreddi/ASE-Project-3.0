import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../posts/posts.service";
import {userError} from "@angular/compiler-cli/src/transformers/util";
import {UserDataService} from "../../user-data.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public userDataService:UserDataService ) { }

  // form: FormGroup;

  userdata:any = [];

  token:any;
  ngOnInit() {
    // this.form = new FormGroup({
    //   'userdata':new FormControl('apple')
    // })
  }

  getData(){
      this.userdata =[];
    this.userDataService.getUserInfo()
        .subscribe(res => {
          console.log(res);
          console.log(res);
          this.userdata.push(res.name);
          this.userdata.push(res.university);
          this.userdata.push(res.enrollment);
        })
  }
}

