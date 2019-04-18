import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {Post} from '../post.model';
import {Subscription} from 'rxjs';
import {post} from 'selenium-webdriver/http';
import {Router} from '@angular/router';
import {PageEvent} from "@angular/material";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  // posts =[
  //   {title:"Technology",content:"Scientific America"},
  //   {title:"News",content:"BBC"},
  //   {title:"Astro",content:"Astro America"}
  // ]

  //before using service to bind data
  // @Input() posts =[];
  posts :Post [] =[];
  private postsSub:Subscription;
  totalPosts = 0 ;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [ 1,2,5,10];
  private authStatusSub: Subscription;
  userIsAuthenticted = false;
  constructor( public postService:PostsService,
               private router:Router,
               private authService:AuthService) { }


  ngOnInit() {
    this.postService.getPosts(this.postsPerPage,this.currentPage);
    this.postsSub=this.postService.getPostUpdatelistner()
      .subscribe((postData:{posts:Post[],postCount:number})=>{
        this.posts=postData.posts;
        this.totalPosts =postData.postCount;
    });
    this.userIsAuthenticted=this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListner()
        .subscribe(isAuthenticated =>{
      this.userIsAuthenticted = isAuthenticated;
    })
  }

  onChangedPage(pageData: PageEvent){
    console.log(pageData);
    this.currentPage = pageData.pageIndex+1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage,this.currentPage);
  }
  onEdit(postId:string,postTitle:string,postContent:string){
    this.router.navigate(['/edit',{id:postId,title:postTitle,content:postContent}]);
  }
  onDelete(postId:string){
    console.log('the id you want to delete - ', postId);
    this.postService.deletePosts(postId)
        .subscribe(() => {
          this.postService.getPosts(this.postsPerPage,this.currentPage);
        });
  }
  onCLick(postTitle:string){
    console.log('title from post string -',postTitle);
    this.router.navigate(['/repo',postTitle]);
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
