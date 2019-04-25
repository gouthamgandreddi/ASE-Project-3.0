import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  like = 0;
  dislike = 0;
  constructor() { }

  ngOnInit() {
  }

  onlike() {
    this.like = this.like + 1;
  }
  ondislike() {
    this.dislike = this.dislike + 1;
  }

}
