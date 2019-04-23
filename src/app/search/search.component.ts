import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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
}
