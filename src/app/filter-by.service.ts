import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {log} from "util";
import {map} from "rxjs/operators";
import {Post} from "./posts/post.model";
import {Subject} from "rxjs";
import {AuthService} from "./auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class FilterByService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  private posts: Post [] = [];
  private postsUpdated = new Subject<{ posts: Post[], postCount: number }>();

  // getclassifications() {
  //   return this.http.get('http://localhost:3000/api/posts/getClassifications');
  // }

  getInfoByCategory(category) {
    const queryParams = `?category=${category}`;
    console.log(category);
    this.http.get('http://localhost:3000/api/posts/byCategory' + queryParams).subscribe(res => {
          this.authService.changeMessage(res);
          // console.log('Category By Models' + res.posts[0].classification);
        }
    )
  }
}
