
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  message:Array<string> =[];
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.currentMessage.subscribe(message => {

      console.log('Search Component ',message);
      this.message = message;
      // console.log('res' + this.message);
      // this.message = message
    });
  }

}
