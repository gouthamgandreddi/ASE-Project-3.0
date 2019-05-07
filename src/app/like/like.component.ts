import { Component, OnInit } from '@angular/core';
import { LikeService} from "../like.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  like = 0;
  dislike = 0;
  // public favourForm: FormGroup;
  favour: any;
  constructor(private serve:LikeService) { }

  ngOnInit() {

    this.serve.addLikes(this.favour).subscribe(res => {
      console.log(res);
      // this.favour = res;
      this.like = res['like'];
      // console.log(res.like);
      // this.favour.like=res.like;
    });
      this.favour = {
        username: localStorage.getItem('username'),
        modelname: 'KB',
        like: this.like,
        dislike: 0
      }
  }

  onlike() {
    // this.like = this.like + 1;
    console.log("in like before", this.like);
    if(this.like===0) {
      this.like=1;
      this.favour.like = 1;
    }
    else {
      this.like=0;
      this.favour.like = 0;
    }
    console.log("in like after", this.like);
    // debugger
    this.serve.addLikes(this.favour).subscribe(res => {
      console.log(res);
      console.log(res['like']);
      this.favour.like=res['like'];
      this.like = res['like'];
    });
  }
  ondislike() {
    if(this.like===1) {
      this.dislike=0;
    }
    else if(this.dislike===0) {
      // this.dislike=1;
      this.favour.dislike = 1;
    }
    else {
      // this.dislike=0;
      this.favour.dislike = 0;
    }
  }

}
