import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http:HttpClient) { }

  addLikes(favourForm) {
    console.log("in service favourForm",favourForm);
     return this.http.post("http://localhost:3000/api/posts/favour", favourForm);
  }


  addComment(commentForm) {
    console.log(' value at comment form'+ commentForm.value.username);
    return this.http.post("http://localhost:3000/api/posts/comment", commentForm.value);
  }

}
