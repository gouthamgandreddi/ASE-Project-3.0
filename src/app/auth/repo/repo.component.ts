import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {type} from "os";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostsService} from "../../posts/posts.service";

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit,OnDestroy {

  title:string;
  sub:any;
  repo:any;
  form: FormGroup;
  files:any;
  description:string;
  githubUrl:string;
  dataLink:string;
  public lineChartType = 'line';
  public SystemName;


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

  constructor(private router:Router,private route:ActivatedRoute,private authService:AuthService,public postService:PostsService) { }

  ngOnInit() {

    this.form = new FormGroup({
      'image': new FormControl(null,{
        validators:[Validators.required]
      })
    });
    this.sub = this.route.params.subscribe(params =>{
      console.log('params in repo - ', params);
      this.title = params['title'];

      this.postService.getFilesList(this.title)
          .subscribe(res =>{
            console.log('res - ',res);
            console.log('typeof - ',typeof res);
            this.files = res;
          });

      this.postService.getModelInfo(this.title)
          .subscribe(res => {
            console.log('res in repo component - ' , res);
            this.description = res.content;
            this.githubUrl = res.githubUrl;
            this.dataLink = res.dataLink;
          });
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

  onFilePicked(event:Event){
    let currentRepo = this.title;
    const file = (event.target as HTMLInputElement).files[0]; //is a file object
    this.form.patchValue({
      'image':file
    });
    console.log(file);
    this.postService.uploadfile(this.form.value.image,this.title)
        .subscribe(res => {
          console.log('upload success in onImagePicked');
          if(res){
              console.log('response on repo - ', res);
              this.postService.getFilesList(this.title)
                  .subscribe(res => {
                      console.log('res - ',res);
                      this.files = res;
                  })
          }
        });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader(); //creating a reader
    reader.readAsDataURL(file);
  }

  getSingleFile(file){
    console.log(file);
    this.postService.getFileService(file.filename);
  }

  deleteFile(filename){
    console.log('delete file in comp - ',filename);
    let currentRepo = this.title;
    console.log(currentRepo);
    this.postService.deleteFileService(filename)
        .subscribe(res =>{
          console.log("response for delete file - ",res);
          console.log('going into getFilelist service ');
          console.log(this.title);
            this.postService.getFilesList(this.title)
                .subscribe(res => {
                    console.log('res - ',res);
                    console.log('typeof - ',typeof res);
                    this.files = res;
                })
          // this.router.navigate(['/repo',this.title]);
        });
  }

  downloadFile(filename:string,contentType:string){
    console.log('delete file in comp - ',filename);
    let currentRepo = this.title;
    console.log('title - ',currentRepo);
    this.postService.downloadFileService(filename,contentType)
        .subscribe( (res)=>{
          console.log('file url in download back to component download ',res);
          const file = new Blob([res], { type: contentType });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          console.log('File download last stage  - ',fileURL);
        });
    }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
      this.repo.unsubscribe();
  }

}
