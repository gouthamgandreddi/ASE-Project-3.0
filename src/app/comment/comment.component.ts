import { Component, OnInit } from '@angular/core';
import { LikeService } from "../like.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private likeserve: LikeService) { }
  // comment: [];
  public comment:Array<string> =[];
  commentForm : FormGroup;

  ngOnInit() {

    // this.commentForm = new FormGroup({
    //   username: new FormControl(localStorage.getItem('username')),
    //   modelname: new FormControl('CNN'),
    //   comment: new FormControl(this.comment)
    // });

  }

  onclick(searchValue: HTMLInputElement) {
    console.log(searchValue.value);
    // this.comment= searchValue.value;
    // console.log(this.commentForm.value);


    this.commentForm = new FormGroup({
      username: new FormControl(localStorage.getItem('username')),
      modelname: new FormControl('CNN'),
      comment: new FormControl(searchValue.value)
    });

    console.log(this.commentForm.value);

    this.likeserve.addComment(this.commentForm).subscribe(res => {

      console.log('response from backend'+ res);
      console.log('response from backend'+ res['username']);
     // this.comment =res.modelname;
      this.comment.push(res['username'], res['comment']);
      console.log('comment value '+ this.comment);

    });




  }



}
