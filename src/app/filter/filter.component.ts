import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { FilterByService } from "../filter-by.service";
import {AuthService} from "../auth/auth.service";

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private filter: FilterByService, public auth: AuthService) { }
  message:Array<string> =[];
  // message: any;
  class:Array<string> =[];

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Deep learning'},
    {value: 'pizza-1', viewValue: 'CNN'},
    {value: 'tacos-2', viewValue: 'Model KB'}
  ];

  ngOnInit() {

    console.log('In Filter component');
    this.auth.currentMessage.subscribe(message => {

      console.log('Search Component ',message);
      this.message = message;
      // console.log('res' + this.message);
    });

    // this.filter.getclassifications().subscribe(result =>
    // // console.log('classifications', result);
    // console.log('classifications', result.posts[0].title));
  }


  onsubmit(d){
    // console.log(d);
    this.filter.getInfoByCategory(d);
  }

}
