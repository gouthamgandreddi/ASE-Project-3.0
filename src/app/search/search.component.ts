<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
=======
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
>>>>>>> b333ed7f5cc3016a71d43803b46774706f7b2d5c

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

<<<<<<< HEAD
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
=======
  private modelDataListnerSubs: Subscription;
  message:Array<any> =[];
  private models: any;
  private results:any;
  name:any;
  data:any;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.currentMessage.subscribe(result => {
      console.log('messge from search',result);
      console.log(result);
      let model =result;
      console.log('model',model);
      console.log(model.length);
      for (let i=0;i<model.length;i++){
        console.log(model[i].model_name,model[i].exper,i);
      }
    });
  }
    // this.modelDataListnerSubs = this.authService
    //     .getAuthStatusListner()
    //     .subscribe(modelData => {
    //       this.models = modelData;
    //      console.log('data from service to search component',modelData);
    //     });


  // ngOnDestroy(): void {
  //   this.modelDataListnerSubs.unsubscribe();
  // }
>>>>>>> b333ed7f5cc3016a71d43803b46774706f7b2d5c
}
