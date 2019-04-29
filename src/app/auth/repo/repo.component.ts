import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../auth.service";
import {type} from "os";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit,OnDestroy {

  title:string;
  sub:any;
  public lineChartType = 'line';
  public SystemName;
  form: FormGroup;


  public labelMFL: Array<any> ;
  public lineChartOptions: any = { 
    responsive: true,
    scales : {
      yAxes: [{
        ticks: {
          max : 1,
          min : 0,
        }
      }]
    },
  };

  //data
  public accuracyValueData:Array<number> =[];
  //data
  public lossValueData:Array<number> =[];
  //label
  public model_iteration:Array<string> =[];

  constructor(private route:ActivatedRoute,private authService:AuthService) { }

  ngOnInit() {

    this.form = new FormGroup({
      'file':new FormControl(null,{
        validators:[Validators.required]
      })
    });
    this.sub = this.route.params.subscribe(params =>{
      console.log('params in repo - ', params);
      this.title = params['title'];
      this.authService.getRepo(this.title).subscribe(res =>{
        console.log('response in repo',res);
        console.log('response in repo',res['ex']);
        let data = res['ex'];
        for(let i=0;i<data.length;i++){
          console.log(data[i].model_name,data[i].accuracyValue,data[i].lossValue);
          this.accuracyValueData.push(data[i].accuracyValue);
          this.lossValueData.push(data[i].lossValue);
          this.model_iteration.push(data[i].model_name);
        }
        this.labelMFL = [
          { data: this.accuracyValueData,
            label: this.SystemName
          }
        ];
        console.log(this.labelMFL);

        // this.readAccuracy();
      });
      this.SystemName = this.title;
      console.log(this.title);
    })
  }

  // public readAccuracy(){
  //   console.log(this.accuracyValueData);
  //   // this.lineChartData = this.accuracyValueData;
  //   this.labelMFL = [
  //     { data: this.accuracyValueData,
  //       label: this.SystemName
  //     }
  //   ];
  //   console.log(this.labelMFL);
  // }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
